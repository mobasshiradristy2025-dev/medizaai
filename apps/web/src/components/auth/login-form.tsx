"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/shared/form-field";
import { OtpInput } from "@/components/shared/otp-input";
import { MOCK_OTP_CODE } from "@/lib/constants";
import {
  loginPhoneSchema,
  otpSchema,
  type LoginPhoneValues,
} from "@/lib/validations/login";

type Role = "customer" | "admin";

const ROLES: { key: Role; label: string }[] = [
  { key: "customer", label: "গ্রাহক" },
  { key: "admin", label: "অ্যাডমিন" },
];

const EMPTY_OTP = ["", "", "", ""];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("customer");
  const [sentPhone, setSentPhone] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(EMPTY_OTP);
  const [otpError, setOtpError] = useState<string>();
  const [verifying, setVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPhoneValues>({
    resolver: zodResolver(loginPhoneSchema),
  });

  async function onSendCode(values: LoginPhoneValues) {
    // TODO: SMS OTP provider decide hole ekhane POST /api/auth/send-otp korben.
    await wait(600);
    setSentPhone(values.phone);
    setOtp(EMPTY_OTP);
    setOtpError(undefined);
  }

  async function onVerify() {
    if (!sentPhone) return;

    if (role === "admin") {
      setOtpError("অ্যাডমিন লগইন এখনো চালু হয়নি।");
      return;
    }

    const code = otp.join("");
    const parsed = otpSchema.safeParse(code);
    if (!parsed.success) {
      setOtpError(parsed.error.issues[0].message);
      return;
    }

    setVerifying(true);
    setOtpError(undefined);
    // TODO: real verify (POST /api/auth/verify-otp) + session cookie
    await wait(600);

    if (code !== MOCK_OTP_CODE) {
      setOtpError("কোড মিলছে না। আবার চেষ্টা করুন।");
      setVerifying(false);
      return;
    }

    router.push(`/account/bookings?phone=${sentPhone}`);
  }

  return (
    <section
      aria-labelledby="login-title"
      className="w-full max-w-[440px] rounded-[16px] border border-line bg-surface p-7 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)]"
    >
      <div className="flex flex-col gap-4">
        <h1
          id="login-title"
          className="text-[26px] leading-[39px] font-bold text-brand-900"
        >
          প্রবেশ করুন
        </h1>

        <div role="group" aria-label="ব্যবহারকারীর ধরন" className="flex gap-2">
          {ROLES.map((item) => {
            const active = role === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setRole(item.key);
                  setOtpError(undefined);
                }}
                className={`h-10 rounded-full border px-4 text-sm leading-[21px] font-semibold transition-colors ${
                  active
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white text-ink hover:border-brand-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit(onSendCode)}
          noValidate
          className="flex flex-col gap-3"
        >
          <FormField
            label="মোবাইল নম্বর"
            type="tel"
            inputMode="tel"
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone", {
              onChange: () => {
                setSentPhone(null);
                setOtp(EMPTY_OTP);
                setOtpError(undefined);
              },
            })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900 disabled:opacity-70"
          >
            {isSubmitting ? "পাঠানো হচ্ছে..." : "কোড পাঠান"}
          </button>
        </form>

        <fieldset
          disabled={!sentPhone}
          className="flex flex-col gap-3 border-0 p-0 disabled:opacity-50"
        >
          <p id="otp-label" className="text-sm leading-[21px] text-ink-2">
            আপনার মোবাইলে পাঠানো ৪ সংখ্যার কোড দিন
          </p>

          <OtpInput
            value={otp}
            onChange={(next) => {
              setOtp(next);
              setOtpError(undefined);
            }}
            labelledBy="otp-label"
            hasError={Boolean(otpError)}
          />

          {sentPhone && (
            <p role="status" className="text-sm leading-[21px] text-ink-3">
              কোড পাঠানো হয়েছে।
              {process.env.NODE_ENV !== "production" &&
                ` (ডেমো কোড: ${MOCK_OTP_CODE})`}
            </p>
          )}

          {otpError && (
            <p role="alert" className="text-sm leading-[21px] text-red-600">
              {otpError}
            </p>
          )}

          <button
            type="button"
            onClick={onVerify}
            disabled={verifying}
            className="h-[50px] rounded-[8px] bg-brand-900 text-base font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
          >
            {verifying ? "যাচাই হচ্ছে..." : "যাচাই করুন"}
          </button>
        </fieldset>

        <Link
          href="/doctors"
          className="text-center text-sm leading-[21px] font-semibold text-brand-700 hover:underline"
        >
          লগইন ছাড়াই বুকিং করুন
        </Link>
      </div>
    </section>
  );
}