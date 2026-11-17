"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/shared/form-field";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentCard } from "@/components/checkout/payment-card";
import { PrescriptionCard } from "@/components/checkout/prescription-card";
import { MEDICINE_ORDER } from "@/lib/constants";
import {
  checkoutSchema,
  type CheckoutValues,
} from "@/lib/validations/checkout";
import { getSubtotal, useCartStore } from "@/store/cart-store";

export function CheckoutForm() {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const clear = useCartStore((state) => state.clear);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
  });

  async function onSubmit(values: CheckoutValues) {
    if (getSubtotal(lines) < MEDICINE_ORDER.minOrder) return;

    // TODO: backend ready hole ekhane POST /api/orders korben (values + lines pathan)
    void values;
    await new Promise((resolve) => setTimeout(resolve, 600));

    clear();
    router.push("/booking/success?type=order");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8 lg:grid-cols-[1fr_380px]"
    >
      <div className="flex min-w-0 flex-col gap-6">
        <section
          aria-labelledby="delivery-title"
          className="rounded-[12px] border border-line bg-surface p-6"
        >
          <div className="flex flex-col gap-3">
            <h2
              id="delivery-title"
              className="pb-1 text-[22px] leading-[33px] font-semibold text-ink"
            >
              ডেলিভারি তথ্য
            </h2>

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

            <div className="grid gap-3 sm:grid-cols-3">
              <FormField
                label="এলাকা"
                placeholder="এলাকার নাম"
                error={errors.area?.message}
                {...register("area")}
              />
              <FormField
                label="রাস্তা"
                placeholder="রাস্তার নাম / নম্বর"
                error={errors.street?.message}
                {...register("street")}
              />
              <FormField
                label="বাসা"
                placeholder="বাসা / ফ্ল্যাট নম্বর"
                error={errors.house?.message}
                {...register("house")}
              />
            </div>

            <p className="text-sm leading-[21px] text-ink-3">
              ডেলিভারি শুধু রাজশাহী শহরের ভেতরে।
            </p>
          </div>
        </section>

        <PaymentCard />
        <PrescriptionCard />
      </div>

      <OrderSummary isSubmitting={isSubmitting} />
    </form>
  );
}