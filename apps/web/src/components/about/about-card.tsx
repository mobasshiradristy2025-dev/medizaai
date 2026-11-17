import { IconBadge } from "@/components/shared/icon-badge";

type AboutCardProps = {
  title: string;
  description: string;
  tone?: "brand" | "accent";
};

export function AboutCard({
  title,
  description,
  tone = "brand",
}: AboutCardProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-[12px] border border-line bg-surface p-5">
      <IconBadge tone={tone} />
      <h3 className="text-[18px] leading-[27px] font-semibold text-ink">
        {title}
      </h3>
      <p className="text-sm leading-[21px] text-ink-2">{description}</p>
    </article>
  );
}