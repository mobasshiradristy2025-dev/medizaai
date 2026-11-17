import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export function AboutIntro() {
  return (
    <section className="py-12 md:py-[72px]">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-[14px]">
          <span className="rounded-full bg-accent-100 px-[10px] py-[3px] text-xs leading-[18px] font-medium text-brand-900">
            আমাদের লক্ষ্য
          </span>
          <h2 className="text-[28px] leading-[38px] font-bold text-brand-900 md:text-[36px] md:leading-[45px]">
            এক জায়গায় ডাক্তার, গাইড ও ওষুধ
          </h2>
          <p className="text-base leading-6 text-ink-2 md:text-[18px] md:leading-[26px]">
            অনেকেই হাসপাতাল বা ইন্টারনেট ব্যবহারে অভ্যস্ত নন। তাই আমরা সহজ বাংলা, বড়
            বাটন আর ফোনে নিশ্চিতকরণ দিয়ে স্বাস্থ্যসেবাকে সবার জন্য সহজ করছি।
          </p>
          <Link
            href="/contact"
            className="rounded-[10px] bg-brand-700 px-6 py-[13px] text-base leading-6 font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-900"
          >
            যোগাযোগ করুন
          </Link>
        </div>

        <div className="relative aspect-[518/339] w-full overflow-hidden rounded-[16px] bg-ph">
          <Image
            src="/images/about/About-photo.png"
            alt="হাসপাতালে রোগীর সঙ্গে ডাক্তার ও গাইড"
            fill
            sizes="(min-width: 1024px) 518px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}