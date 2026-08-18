import { FormData, inputClass, inputErrorClass, selectClass, selectErrorClass, errorTextClass, labelClass, sectionHeadingClass } from "./types";
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
      {/* Team Information */}
      <div className="mb-[30px]">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1 h-[14px] bg-[#ff3355] flex-shrink-0" />
          TEAM INFORMATION
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className={labelClass}>
              TEAM NAME <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="teamName" type="text" required
              value={form.teamName}
              onChange={(e) => onChange("teamName", e.target.value)}
              onBlur={() => onBlur("teamName")}
              placeholder="TEAM_NAME"
              autoComplete="off"
              maxLength={50}
              aria-invalid={Boolean(errors.teamName)}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
              className={cls("teamName")}
            />
            {errors.teamName && <span id="teamName-error" className={errorTextClass}>{errors.teamName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className={labelClass}>
              COUNTRY <span className="text-[#ff3355]">*</span>
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
                <option value="" disabled>SELECT COUNTRY</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#39ff6a]"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
              >
                ▾
              </span>
            </div>
            {errors.country && <span id="country-error" className={errorTextClass}>{errors.country}</span>}
          </div>
        </div>
      </div>

      {/* Team Leader */}
      <div className="mb-[30px]">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1 h-[14px] bg-[#ff3355] flex-shrink-0" />
          TEAM LEADER
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderName" className={labelClass}>
              FULL NAME <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="leaderName" type="text" required
              value={form.leaderName}
              onChange={(e) => onChange("leaderName", e.target.value)}
              onBlur={() => onBlur("leaderName")}
              placeholder="LEADER_NAME"
              autoComplete="name"
              aria-invalid={Boolean(errors.leaderName)}
              aria-describedby={errors.leaderName ? "leaderName-error" : undefined}
              className={cls("leaderName")}
            />
            {errors.leaderName && <span id="leaderName-error" className={errorTextClass}>{errors.leaderName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderEmail" className={labelClass}>
              EMAIL <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="leaderEmail" type="email" required
              value={form.leaderEmail}
              onChange={(e) => onChange("leaderEmail", e.target.value)}
              onBlur={() => onBlur("leaderEmail")}
              placeholder="LEADER@DOMAIN.COM"
              autoComplete="email"
              inputMode="email"
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