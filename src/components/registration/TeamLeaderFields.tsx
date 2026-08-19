import { FormData, FIELD_MAX, inputClass, inputErrorClass, selectClass, selectErrorClass, errorTextClass, labelClass, sectionHeadingClass } from "./types";
import { FieldErrors } from "./validation";
import { COUNTRIES } from "./countries";

interface Props {
  form: FormData;
  errors: FieldErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
}

export default function TeamLeaderFields({ form, errors, onChange, onBlur }: Props) {
  const cls = (field: keyof FormData) => (errors[field] ? inputErrorClass : inputClass);

  return (
    <>
      {/* Team information */}
      <div className="mb-8">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1.5 h-3.5 rounded-full bg-[var(--accent)] shrink-0" />
          Team information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className={labelClass}>
              Team name <span className="text-red-400">*</span>
            </label>
            <input
              id="teamName" type="text" required
              value={form.teamName}
              onChange={(e) => onChange("teamName", e.target.value)}
              onBlur={() => onBlur("teamName")}
              placeholder="team_name"
              autoComplete="off"
              maxLength={FIELD_MAX.teamName}
              aria-invalid={Boolean(errors.teamName)}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
              className={cls("teamName")}
            />
            {errors.teamName && <span id="teamName-error" className={errorTextClass}>{errors.teamName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className={labelClass}>
              Country <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                id="country" required
                value={form.country}
                onChange={(e) => onChange("country", e.target.value)}
                onBlur={() => onBlur("country")}
                autoComplete="country-name"
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? "country-error" : undefined}
                className={errors.country ? selectErrorClass : selectClass}
              >
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--accent)] text-[12px]"
              >
                ▾
              </span>
            </div>
            {errors.country && <span id="country-error" className={errorTextClass}>{errors.country}</span>}
          </div>
        </div>
      </div>

      {/* Team leader */}
      <div className="mb-8">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1.5 h-3.5 rounded-full bg-[var(--accent)] shrink-0" />
          Team leader
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderName" className={labelClass}>
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              id="leaderName" type="text" required
              value={form.leaderName}
              onChange={(e) => onChange("leaderName", e.target.value)}
              onBlur={() => onBlur("leaderName")}
              placeholder="Leader name"
              autoComplete="name"
              maxLength={FIELD_MAX.leaderName}
              aria-invalid={Boolean(errors.leaderName)}
              aria-describedby={errors.leaderName ? "leaderName-error" : undefined}
              className={cls("leaderName")}
            />
            {errors.leaderName && <span id="leaderName-error" className={errorTextClass}>{errors.leaderName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderEmail" className={labelClass}>
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="leaderEmail" type="email" required
              value={form.leaderEmail}
              onChange={(e) => onChange("leaderEmail", e.target.value)}
              onBlur={() => onBlur("leaderEmail")}
              placeholder="leader@domain.com"
              autoComplete="email"
              inputMode="email"
              maxLength={FIELD_MAX.leaderEmail}
              aria-invalid={Boolean(errors.leaderEmail)}
              aria-describedby={errors.leaderEmail ? "leaderEmail-error" : undefined}
              className={cls("leaderEmail")}
            />
            {errors.leaderEmail && <span id="leaderEmail-error" className={errorTextClass}>{errors.leaderEmail}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
