"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/shared/form-field";
import { FormSelect } from "@/components/shared/form-select";
import { formatPrice } from "@/lib/bn-number";
import {
  guideBookingSchema,
  type GuideBookingValues,
} from "@/lib/validations/booking";
import type { GuidePackage } from "@/types/guide";

type GuideBookingCardProps = {
  guideSlug: string;
  selectedPackage: GuidePackage;
  hospitals: string[];
};

export function GuideBookingCard({
  guideSlug,
  selectedPackage,
  hospitals,
}: GuideBookingCardProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuideBookingValues>({
    resolver: zodResolver(guideBookingSchema),
    defaultValues: { hospital: "" },
  });

  async function onSubmit(values: GuideBookingValues) {
    // TODO: backend ready hole ekhane POST /api/bookings korben (values + package pathan)
    void values;
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push(
      `/booking/success?type=guide&item=${guideSlug}&package=${selectedPackage.key}`,
    );
  }

  return (
    <section
      aria-labelledby="guide-booking-title"
      className="self-start rounded-[12px] border border-line bg-surface p-6 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.12)] lg:sticky lg:top-6"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-3"
      >
        <h2
          id="guide-booking-title"
          className="pb-1 text-[24px] leading-9 font-bold text-brand-900"
        >
          গাইড বুক করুন
        </h2>

        <div
          aria-live="polite"
          className="flex items-center justify-between rounded-[10px] bg-brand-100/40 px-4 py-3"
        >
          <span className="text-base leading-6 font-medium text-ink">
            {selectedPackage.label} প্যাকেজ
          </span>
          <span className="text-[22px] leading-[33px] font-bold text-brand-700">
            {formatPrice(selectedPackage.price)}
          </span>
        </div>

        <FormField
          label="আপনার নাম"
          placeholder="পুরো নাম লিখুন"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label="মোবাইল নম্বর"
          type="tel"
          inputMode="tel"
          placeholder="01XXXXXXXXX"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FormSelect
          label="কোন হাসপাতালে যাবেন"
          placeholder="হাসপাতাল বেছে নিন"
          options={hospitals}
          error={errors.hospital?.message}
          {...register("hospital")}
        />
        <FormField
          label="পছন্দের তারিখ"
          type="date"
          error={errors.date?.message}
          {...register("date")}
        />
        <FormField
          label="পছন্দের সময়"
          placeholder="যেমন: সকাল ১০টা"
          error={errors.time?.message}
          {...register("time")}
        />
        <FormField
          label="নোট (ঐচ্ছিক)"
          placeholder="কোন ডাক্তার বা টেস্ট"
          error={errors.note?.message}
          {...register("note")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900 disabled:opacity-70"
        >
          {isSubmitting ? "পাঠানো হচ্ছে..." : "বুকিং নিশ্চিত করুন"}
        </button>

        <p className="text-xs leading-[18px] text-ink-3">
          এটি সরাসরি সঙ্গে যাওয়ার সেবা। আমরা ফোন করে নিশ্চিত করব।
        </p>
      </form>
    </section>
  );
}