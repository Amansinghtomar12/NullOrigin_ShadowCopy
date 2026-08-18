import { FormData, inputClass, inputErrorClass, errorTextClass, labelClass } from "./types";
import { FieldErrors } from "./validation";

interface Props {
  n: number;
  required?: boolean;
  expanded: boolean;
  form: FormData;
  errors: FieldErrors;
  onToggle: (n: number) => void;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
}

export default function MemberField({ n, required = false, expanded, form, errors, onToggle, onChange, onBlur }: Props) {
  const dKey = `member${n}Discord` as keyof FormData;
  const cKey = `member${n}CTFtime` as keyof FormData;

  const hasError = Boolean(errors[dKey] || errors[cKey]);
  const barColor = hasError ? "#ff3355" : required ? "#39ff6a" : "#7c8389";

  return (
    <div
      className="border-[3px] border-[#000] mb-[14px]"
      style={{ background: "#101018" }}
    >
      {/* Member header */}
      <button
        type="button"
        onClick={() => onToggle(n)}
        aria-expanded={expanded}
        aria-controls={`member${n}-fields`}
        className="w-full flex items-center justify-between px-[18px] py-[16px] cursor-pointer focus:outline-none"
        style={{ background: "transparent", border: "none" }}
      >
        <div className="flex items-center gap-[10px]">
          <span
            className="inline-block w-1 h-[14px] flex-shrink-0"
            style={{ background: barColor }}
          />
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "11px",
              color: "#f4f6f5",
            }}
          >
            MEMBER {n}{" "}
            {required
              ? <span className="text-[#ff3355]">*</span>
              : <span style={{ color: "#7c8389", fontWeight: "normal", fontSize: "10px" }}>(optional)</span>
            }
          </span>
          {hasError && !expanded && (
            <span style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: "#ff3355" }}>
              — needs attention
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "12px",
            color: "#39ff6a",
            transition: "transform .15s",
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {/* Member body */}
      {expanded && (
        <div
          id={`member${n}-fields`}
          className="px-[18px] pb-[20px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mt-1">
            <div className="flex flex-col gap-2">
              <label htmlFor={`m${n}discord`} className={labelClass}>
                DISCORD USERNAME{required && <span className="text-[#ff3355] ml-0.5">*</span>}
              </label>
              <input
                id={`m${n}discord`}
                type="text"
                required={required}
                value={form[dKey] as string}
                onChange={(e) => onChange(dKey, e.target.value)}
                onBlur={() => onBlur(dKey)}
                placeholder="USERNAME"
                autoComplete="off"
                maxLength={32}
                aria-invalid={Boolean(errors[dKey])}
                aria-describedby={errors[dKey] ? `m${n}discord-error` : undefined}
                className={errors[dKey] ? inputErrorClass : inputClass}
              />
              {errors[dKey] && <span id={`m${n}discord-error`} className={errorTextClass}>{errors[dKey]}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`m${n}ctftime`} className={labelClass}>
                CTFTIME PROFILE{required && <span className="text-[#ff3355] ml-0.5">*</span>}
              </label>
              <input
                id={`m${n}ctftime`}
                type="url"
                required={required}
                value={form[cKey] as string}
                onChange={(e) => onChange(cKey, e.target.value)}
                onBlur={() => onBlur(cKey)}
                placeholder="CTFTIME.ORG/USER/..."
                autoComplete="off"
                inputMode="url"
                aria-invalid={Boolean(errors[cKey])}
                aria-describedby={errors[cKey] ? `m${n}ctftime-error` : undefined}
                className={errors[cKey] ? inputErrorClass : inputClass}
              />
              {errors[cKey] && <span id={`m${n}ctftime-error`} className={errorTextClass}>{errors[cKey]}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}