"use client";

import { useRef } from "react";
import { toBn } from "@/lib/bn-number";

type OtpInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  labelledBy: string;
  hasError?: boolean;
};

export function OtpInput({
  value,
  onChange,
  labelledBy,
  hasError = false,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const length = value.length;

  function focusAt(index: number) {
    refs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
  }

  function fillFrom(index: number, raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;
    const next = [...value];
    let cursor = index;
    for (const digit of digits) {
      if (cursor >= length) break;
      next[cursor] = digit;
      cursor += 1;
    }
    onChange(next);
    focusAt(cursor);
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...value];
      if (next[index]) {
        next[index] = "";
        onChange(next);
      } else if (index > 0) {
        next[index - 1] = "";
        onChange(next);
        focusAt(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  }

  return (
    <div role="group" aria-labelledby={labelledBy} className="flex gap-3">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          aria-label={`কোডের ${toBn(index + 1)} নম্বর সংখ্যা`}
          aria-invalid={hasError ? true : undefined}
          onChange={(event) => fillFrom(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onFocus={(event) => event.target.select()}
          onPaste={(event) => {
            event.preventDefault();
            fillFrom(index, event.clipboardData.getData("text"));
          }}
          className={`size-[50px] rounded-[8px] border bg-white text-center text-lg font-semibold text-ink outline-none focus:border-brand-700 ${
            hasError ? "border-red-600" : "border-line"
          }`}
        />
      ))}
    </div>
  );
}