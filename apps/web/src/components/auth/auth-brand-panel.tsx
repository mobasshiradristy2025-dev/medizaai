import Link from "next/link";

export function AuthBrandPanel() {
  return (
    <aside className="hidden bg-gradient-to-br from-brand-900 to-brand-700 lg:flex lg:items-center lg:px-12 xl:px-[120px]">
      <div className="flex max-w-[520px] flex-col gap-6">
        <Link href="/" className="flex items-center gap-[10px]">
          <span className="flex size-10 items-center justify-center rounded-[20px] bg-accent text-[20px] leading-[30px] font-bold text-brand-900">
            M
          </span>
          <span className="text-[26px] leading-[39px] font-bold text-white">
            Medizaai
          </span>
        </Link>

        <h2 className="text-[36px] leading-[46px] font-bold text-white xl:text-[40px] xl:leading-[52px]">
          আপনার বুকিং ও অর্ডার এক জায়গায়
        </h2>
        <p className="text-base leading-7 text-brand-100">
          লগইন ঐচ্ছিক — মোবাইল নম্বর দিয়েই বুকিং করা যায়। লগইন করলে পুরনো
          বুকিংয়ের ইতিহাস দেখতে পাবেন।
        </p>
      </div>
    </aside>
  );
}