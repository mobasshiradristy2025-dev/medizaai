import Image from "next/image";
import type { Guide } from "@/types/guide";
import { formatPrice, toBn } from "@/lib/bn-number";

export function GuideListCard({ guide }: { guide: Guide }) {
  const labelId = `package-label-${guide.slug}`;

  return (
    <article className="mx-auto flex w-full max-w-[420px] flex-col rounded-[12px] border border-line bg-surface p-4 shadow-[0px_8px_24px_0px_rgba(15,79,74,0.08)] lg:max-w-none">
      <form
        action={`/guides/${guide.slug}`}
        method="get"
        className="flex flex-col gap-3"
      >
        <div className="relative aspect-[350/188] w-full overflow-hidden rounded-[8px] bg-ph">
          <Image
            src={guide.listImage ?? guide.image}
            alt={guide.name}
            fill
            sizes="(min-width: 1024px) 350px, 420px"
            className="object-cover object-top"
          />
        </div>

        <h3 className="text-[20px] leading-[30px] font-semibold text-ink">
          {guide.name}
        </h3>

        <span className="self-start rounded-full bg-brand-100 px-[10px] py-[3px] text-xs leading-[18px] whitespace-nowrap text-brand-900">
          অভিজ্ঞতা {toBn(guide.experienceYears)} বছর
        </span>

        <p className="text-sm leading-[21px] text-ink-2">{guide.description}</p>

        <p id={labelId} className="text-[15px] leading-6 text-ink">
          প্যাকেজ
        </p>

        <div
          role="radiogroup"
          aria-labelledby={labelId}
          className="flex flex-col gap-3"
        >
          {guide.packages.map((pkg, index) => (
            <label key={pkg.key} className="cursor-pointer">
              <input
                type="radio"
                name="package"
                value={pkg.key}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="flex items-center justify-between rounded-[10px] border border-line bg-white px-4 py-[10px] text-[15px] leading-6 transition-colors peer-checked:border-brand-700 peer-checked:bg-brand-100/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700">
                <span className="text-ink">{pkg.label}</span>
                <span className="font-bold text-brand-700">
                  {formatPrice(pkg.price)}
                </span>
              </span>
            </label>
          ))}
        </div>

        <p className="text-xs leading-[18px] text-ink-3">
          [প্যাকেজ অনুযায়ী সেবার তালিকা যোগ হবে]
        </p>

        <button
          type="submit"
          className="h-[50px] rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900"
        >
          বুক করুন
        </button>
      </form>
    </article>
  );
}