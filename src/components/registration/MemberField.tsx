import { ChevronDown } from "lucide-react";
import { FormData, FIELD_MAX, inputClass, inputErrorClass, errorTextClass, labelClass } from "./types";
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

  return (
    <div
      className={`rounded-2xl border-2 mb-3.5 bg-[rgba(20,6,12,0.35)] transition-colors ${
        hasError ? "border-red-500/60" : "border-[var(--line-soft)]"
      }`}
    >
      {/* header */}
      <button
        type="button"
        onClick={() => onToggle(n)}
        aria-expanded={expanded}
        aria-controls={`member${n}-fields`}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer bg-transparent border-0"
      >
        <span className="flex items-center gap-2.5">
          <span
            className={`inline-block w-1.5 h-3.5 rounded-full shrink-0 ${
              hasError ? "bg-red-500" : "bg-[var(--accent)]"
            }`}
          />
          <span className="text-[14px] font-semibold text-white tracking-wide">
            Member {n}
            {!required && (
              <span className="ml-2 font-normal text-[12px] text-[var(--faint)]">(optional)</span>
            )}
            {required && <span className="text-red-400 ml-1">*</span>}
          </span>
          {hasError && !expanded && (
            <span className="text-[12px] text-red-400">— needs attention</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--accent)] transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* body */}
      {expanded && (
        <div id={`member${n}-fields`} className="px-5 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
            <div className="flex flex-col gap-2">
              <label htmlFor={`m${n}discord`} className={labelClass}>
                Discord username{required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                id={`m${n}discord`}
                type="text"
                required={required}
                value={form[dKey] as string}
                onChange={(e) => onChange(dKey, e.target.value)}
                onBlur={() => onBlur(dKey)}
                placeholder="username"
                autoComplete="off"
                maxLength={FIELD_MAX.member1Discord}
                aria-invalid={Boolean(errors[dKey])}
                aria-describedby={errors[dKey] ? `m${n}discord-error` : undefined}
                className={errors[dKey] ? inputErrorClass : inputClass}
              />
              {errors[dKey] && <span id={`m${n}discord-error`} className={errorTextClass}>{errors[dKey]}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`m${n}ctftime`} className={labelClass}>
                CTFtime profile{required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                id={`m${n}ctftime`}
                type="url"
                required={required}
                value={form[cKey] as string}
                onChange={(e) => onChange(cKey, e.target.value)}
                onBlur={() => onBlur(cKey)}
                placeholder="ctftime.org/user/…"
                autoComplete="off"
                inputMode="url"
                maxLength={FIELD_MAX.member1CTFtime}
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
