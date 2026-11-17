import { useId } from "react";

type FormTextareaProps = React.ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

export function FormTextarea({
  label,
  error,
  className = "",
  ...textareaProps
}: FormTextareaProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm leading-[21px] text-ink-2">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-[120px] w-full resize-y rounded-[8px] border bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-ink-3 focus:border-brand-700 ${
          error ? "border-red-600" : "border-line"
        } ${className}`}
        {...textareaProps}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm leading-[21px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}