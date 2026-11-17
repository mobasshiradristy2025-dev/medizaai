"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/shared/form-field";
import { FormTextarea } from "@/components/shared/form-textarea";
import { contactSchema, type ContactValues } from "@/lib/validations/contact";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactValues) {
    setSent(false);
    // TODO: backend ready hole ekhane POST /api/contact korben (values pathan).
    // Ekhon shudhu mock: asol-e kothao bartar jay na.
    void values;
    await new Promise((resolve) => setTimeout(resolve, 600));
    reset();
    setSent(true);
  }

  return (
    <section
      aria-labelledby="contact-form-title"
      className="rounded-[16px] border border-line bg-surface p-7"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-3"
      >
        <h2
          id="contact-form-title"
          className="pb-1.5 text-[20px] leading-[30px] font-bold text-brand-900"
        >
          বার্তা পাঠান
        </h2>

        {sent && (
          <p
            role="status"
            className="rounded-[10px] bg-brand-100/40 px-4 py-3 text-sm leading-[21px] text-brand-900"
          >
            ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে। আমরা শিগগির যোগাযোগ করব।
          </p>
        )}

        <FormField
          label="আপনার নাম"
          placeholder="পুরো নাম"
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
        <FormField
          label="বিষয়"
          placeholder="কী বিষয়ে জানতে চান"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <FormTextarea
          label="বার্তা"
          placeholder="আপনার বার্তা লিখুন"
          error={errors.message?.message}
          {...register("message")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900 disabled:opacity-70"
        >
          {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
        </button>
      </form>
    </section>
  );
}