type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  children?: React.ReactNode; // ডানদিকের link/button
};

export function SectionHeading({
  title,
  subtitle,
  light = false,
  children,
}: SectionHeadingProps) {
  return (
    <div className="flex w-full items-end justify-between gap-4">
      <div className="flex flex-col gap-[6px]">
        <h2
          className={`text-[28px] leading-[38px] font-bold md:text-[36px] md:leading-[45px] ${
            light ? "text-white" : "text-brand-900"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-base leading-6 md:text-[17px] md:leading-[26px] ${
              light ? "text-brand-100" : "text-ink-2"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}