import type { Guide } from "@/types/guide";
import { formatPrice } from "@/lib/bn-number";

export function PackageComparisonTable({ guides }: { guides: Guide[] }) {
  const rows = guides[0]?.packages ?? [];

  return (
    <div className="overflow-x-auto rounded-[12px] border border-line bg-surface">
      <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-[15px] leading-6">
        <thead className="bg-brand-100/40">
          <tr>
            <th scope="col" className="px-5 py-[14px] font-semibold text-ink">
              প্যাকেজ
            </th>
            {guides.map((guide) => (
              <th
                key={guide.slug}
                scope="col"
                className="px-5 py-[14px] font-semibold text-ink"
              >
                {guide.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="even:bg-line/25">
              <th
                scope="row"
                className="px-5 py-[14px] font-medium text-ink"
              >
                {row.label}
              </th>
              {guides.map((guide) => {
                const price = guide.packages.find(
                  (pkg) => pkg.key === row.key,
                )?.price;
                return (
                  <td
                    key={guide.slug}
                    className="px-5 py-[14px] font-bold text-brand-700"
                  >
                    {price ? formatPrice(price) : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}