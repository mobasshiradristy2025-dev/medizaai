import { Container } from "@/components/shared/container";
import { HospitalListCard } from "@/components/hospitals/hospital-list-card";
import { HospitalSearchBar } from "@/components/hospitals/hospital-search-bar";
import { HospitalTypeTabs } from "@/components/hospitals/hospital-type-tabs";
import {
  getHospitalCount,
  getHospitalTypes,
  isHospitalType,
  searchHospitals,
} from "@/lib/api/hospitals";

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function HospitalsBrowser({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const q = first(params.q)?.trim() ?? "";
  const typeParam = first(params.type);
  const type = isHospitalType(typeParam) ? typeParam : undefined;

  const hospitals = await searchHospitals({ q, type });

  return (
    <section className="py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8 md:gap-[60px]">
        <HospitalSearchBar defaultQuery={q} type={type} />

        <HospitalTypeTabs
          types={getHospitalTypes()}
          active={type}
          q={q}
          total={getHospitalCount()}
        />

        {hospitals.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-y-[60px] lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <li key={hospital.slug} className="flex">
                <HospitalListCard hospital={hospital} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[12px] border border-line bg-surface px-5 py-10 text-center text-ink-2">
            কোনো হাসপাতাল পাওয়া যায়নি। অন্য নামে বা ধরনে খুঁজে দেখুন।
          </div>
        )}
      </Container>
    </section>
  );
}