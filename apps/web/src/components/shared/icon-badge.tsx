type IconBadgeProps = {
  tone?: "brand" | "accent";
  children?: React.ReactNode;
};

export function IconBadge({ tone = "brand", children }: IconBadgeProps) {
  const box = tone === "brand" ? "bg-brand-100" : "bg-accent-100";
  const dot = tone === "brand" ? "bg-brand-700" : "bg-accent";

  return (
    <span
      aria-hidden
      className={`flex size-[52px] shrink-0 items-center justify-center rounded-[14px] ${box}`}
    >
      {children ?? <span className={`size-[22px] rounded-full ${dot}`} />}
    </span>
  );
}