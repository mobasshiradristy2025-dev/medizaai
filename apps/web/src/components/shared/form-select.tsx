import { useId } from "react";
import { ChevronDown } from "lucide-react";

type FormSelectProps = React.ComponentProps<"select"> & {
  label: string;
  placeholder: string;
  options: string[];
  error?: string;
};

export function FormSelect({
  label,
  placeholder,
  options,
  error,
  className = "",
  ...selectProps
}: FormSelectProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm leading-[21px] text-ink-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-[50px] w-full appearance-none rounded-[8px] border bg-white pr-11 pl-4 text-base text-ink outline-none invalid:text-ink-3 focus:border-brand-700 ${
            error ? "border-red-600" : "border-line"
          } ${className}`}
          required
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={18}
          strokeWidth={2.5}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-brand-700"
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm leading-[21px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}