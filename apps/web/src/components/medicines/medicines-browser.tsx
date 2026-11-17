import { Container } from "@/components/shared/container";
import { CartSummary } from "@/components/medicines/cart-summary";
import { MedicineCard } from "@/components/medicines/medicine-card";
import { MedicineCategoryTabs } from "@/components/medicines/medicine-category-tabs";
import { MedicineInfoStrip } from "@/components/medicines/medicine-info-strip";
import { MedicineSearchBar } from "@/components/medicines/medicine-search-bar";
import {
  getMedicineCategories,
  getMedicines,
  isMedicineCategory,
} from "@/lib/api/medicines";

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function MedicinesBrowser({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const q = first(params.q)?.trim() ?? "";
  const categoryParam = first(params.category);
  const category = isMedicineCategory(categoryParam)
    ? categoryParam
    : undefined;

  const medicines = await getMedicines({ q, category });

  return (
    <section className="py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8">
        <MedicineInfoStrip />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="flex min-w-0 flex-col gap-6">
            <MedicineSearchBar defaultQuery={q} category={category} />
            <MedicineCategoryTabs
              categories={getMedicineCategories()}
              active={category}
              q={q}
            />

            {medicines.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {medicines.map((medicine) => (
                  <li key={medicine.slug} className="flex">
                    <MedicineCard medicine={medicine} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[12px] border border-line bg-surface px-5 py-10 text-center text-ink-2">
                কোনো ওষুধ পাওয়া যায়নি। অন্য নামে বা ধরনে খুঁজে দেখুন।
              </div>
            )}
          </div>

          <CartSummary />
        </div>
      </Container>
    </section>
  );
}