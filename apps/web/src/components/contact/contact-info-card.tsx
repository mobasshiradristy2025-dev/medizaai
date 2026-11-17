import { CONTACT } from "@/lib/constants";

const ITEMS = [
  { label: "হোয়াটসঅ্যাপ", value: CONTACT.whatsappDisplay },
  { label: "অফিস", value: "[অফিসের ঠিকানা যোগ হবে]" },
  {
    label: "জরুরি নম্বর",
    value: `${CONTACT.emergency} · স্বাস্থ্য বাতায়ন ${CONTACT.healthHotline}`,
  },
];

export function ContactInfoCard() {
  return (
    <section
      aria-labelledby="contact-info-title"
      className="flex flex-col gap-4 rounded-[16px] border border-line bg-surface p-7"
    >
      <h2
        id="contact-info-title"
        className="pb-1 text-[20px] leading-[30px] font-bold text-brand-900"
      >
        সরাসরি যোগাযোগ
      </h2>

      <dl className="flex flex-col gap-[14px]">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <dt className="text-xs leading-[18px] text-ink-3">{item.label}</dt>
            <dd className="text-[18px] leading-[27px] font-bold text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={CONTACT.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[50px] items-center justify-center rounded-[8px] bg-brand-700 text-base font-semibold text-white transition-colors hover:bg-brand-900"
      >
        হোয়াটসঅ্যাপে চ্যাট করুন
      </a>
    </section>
  );
}