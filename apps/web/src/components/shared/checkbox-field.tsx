import { Check } from "lucide-react";

type CheckboxFieldProps = {
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
};

export function CheckboxField({ label, ...inputProps }: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-[10px] text-[15px] leading-6 text-ink">
      <input type="checkbox" className="peer sr-only" {...inputProps} />
      <span className="flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white text-transparent transition-colors peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700">
        <Check size={14} strokeWidth={3} />
      </span>
      {label}
    </label>
  );
}