import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  light = false,
}: {
  items: Crumb[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-2 text-[13px] leading-5 ${
          light ? "text-brand-100" : "text-ink-2"
        }`}
      >
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={light ? "hover:text-white" : "hover:text-brand-700"}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}