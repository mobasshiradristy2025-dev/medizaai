import Link from "next/link";

export function SeeAllLink({
  href,
  children = "সব দেখুন",
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[15px] leading-[22px] font-semibold whitespace-nowrap text-brand-700 hover:underline"
    >
      {children}
    </Link>
  );
}