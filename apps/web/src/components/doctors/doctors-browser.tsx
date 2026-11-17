import { Container } from "@/components/shared/container";
import { DoctorFilters } from "@/components/doctors/doctor-filters";
import { DoctorListItem } from "@/components/doctors/doctor-list-item";
import { DoctorSearchBar } from "@/components/doctors/doctor-search-bar";
import { toBn } from "@/lib/bn-number";
import {
  getDoctors,
  getFeeRange,
  getSpecialties,
  type DoctorSort,
} from "@/lib/api/doctors";

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function many(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function buildHref(filters: {
  q: string;
  specialties: string[];
  videoOnly: boolean;
  sort?: DoctorSort;
}) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  filters.specialties.forEach((s) => params.append("specialty", s));
  if (filters.videoOnly) params.set("video", "1");
  if (filters.sort) params.set("sort", filters.sort);
  const query = params.toString();
  return query ? `/doctors?${query}` : "/doctors";
}

export async function DoctorsBrowser({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const q = first(params.q)?.trim() ?? "";
  const specialties = many(params.specialty);
  const videoOnly = first(params.video) === "1";
  const sortParam = first(params.sort);
  const sort: DoctorSort | undefined =
    sortParam === "fee-asc" || sortParam === "fee-desc" ? sortParam : undefined;

  const doctors = await getDoctors({ q, specialties, videoOnly, sort });
  const nextSort: DoctorSort = sort === "fee-asc" ? "fee-desc" : "fee-asc";
  const sortHref = buildHref({ q, specialties, videoOnly, sort: nextSort });

  return (
    <section className="py-12 md:py-[72px]">
      <Container>
        <form
          action="/doctors"
          method="get"
          className="grid gap-8 lg:grid-cols-[300px_1fr]"
        >
          {sort && <input type="hidden" name="sort" value={sort} />}

          <DoctorFilters
            specialties={getSpecialties()}
            selectedSpecialties={specialties}
            videoOnly={videoOnly}
            feeRange={getFeeRange()}
          />

          <div className="flex min-w-0 flex-col gap-6">
            <DoctorSearchBar defaultQuery={q} sortHref={sortHref} />

            <p className="text-sm leading-[21px] text-ink">
              {toBn(doctors.length)} জন ডাক্তার পাওয়া গেছে
            </p>

            <div className="flex flex-col gap-5">
              {doctors.map((doctor) => (
                <DoctorListItem key={doctor.slug} doctor={doctor} />
              ))}

              {doctors.length === 0 && (
                <div className="rounded-[12px] border border-line bg-surface px-5 py-10 text-center text-ink-2">
                  কোনো ডাক্তার পাওয়া যায়নি। ফিল্টার বদলে আবার চেষ্টা করুন।
                </div>
              )}

              <div className="flex flex-col items-center gap-2 rounded-[12px] border border-dashed border-line px-5 py-[30px] text-center">
                <p className="text-base leading-6 font-semibold text-ink">
                  আরও ডাক্তার শিগগিরই যোগ হবে
                </p>
                <p className="text-sm leading-[21px] text-ink-2">
                  নতুন ডাক্তার যুক্ত হলে এখানে দেখা যাবে।
                </p>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}