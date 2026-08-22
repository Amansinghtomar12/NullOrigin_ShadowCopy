import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COUNTRIES } from "./countries";
import { selectClass, selectErrorClass } from "./types";
import { sound } from "../../hooks/utils/audio";

interface Props {
  id: string;
  value: string;
  error?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

/**
 * Themed replacement for the native country <select>. The native popup is
 * drawn by the OS and ignores CSS entirely, which is why it broke the page's
 * look. This is the ARIA "select-only combobox" pattern: focus stays on the
 * trigger button, the list is a styled listbox the trigger points into via
 * aria-activedescendant, and the keyboard behaves like a native select —
 * arrows, Home/End, Enter/Space, Escape, and type-ahead ("in" jumps to India).
 */
export default function CountrySelect({ id, value, error, describedBy, onChange, onBlur }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const typed = useRef({ buffer: "", at: 0 });

  const optId = (i: number) => `${id}-opt-${i}`;

  const openList = () => {
    const i = Math.max(COUNTRIES.indexOf(value), 0);
    setActive(i);
    setOpen(true);
  };

  const commit = (i: number) => {
    if (i >= 0 && i < COUNTRIES.length) onChange(COUNTRIES[i]);
    setOpen(false);
    sound.playClick?.();
  };

  // Keep the highlighted row in view as the user arrows through the list.
  useEffect(() => {
    if (!open || active < 0) return;
    document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" });
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const typeAhead = (key: string) => {
    const now = Date.now();
    const t = typed.current;
    t.buffer = now - t.at > 700 ? key : t.buffer + key;
    t.at = now;
    const q = t.buffer.toLowerCase();
    const i = COUNTRIES.findIndex((c) => c.toLowerCase().startsWith(q));
    if (i >= 0) {
      if (open) setActive(i);
      else onChange(COUNTRIES[i]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      } else if (e.key.length === 1 && /\S/.test(e.key)) {
        typeAhead(e.key);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, COUNTRIES.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(COUNTRIES.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) typeAhead(e.key);
    }
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false);
          onBlur();
        }}
        className={`${error ? selectErrorClass : selectClass} text-left ${
          value ? "" : "text-[var(--faint)]"
        }`}
      >
        {value || "Select country"}
        <ChevronDown
          aria-hidden="true"
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--accent)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-label="Country"
          className="combo-pop absolute z-30 mt-2 w-full max-h-72 overflow-y-auto p-1.5"
        >
          {COUNTRIES.map((c, i) => (
            <li
              key={c}
              id={optId(i)}
              role="option"
              aria-selected={c === value}
              // preventDefault keeps focus on the trigger so onBlur (which
              // closes the list and runs validation) doesn't fire mid-click.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commit(i)}
              // onMouseMove, not onMouseEnter: when type-ahead scrolls the
              // list, rows slide under the stationary cursor and mouseenter
              // would steal the highlight from the keyboard.
              onMouseMove={() => active !== i && setActive(i)}
              className={`combo-opt ${i === active ? "combo-opt--active" : ""} ${
                c === value ? "combo-opt--selected" : ""
              }`}
            >
              <span className="truncate">{c}</span>
              {c === value && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--amber)]" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
