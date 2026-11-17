import { Container } from "@/components/shared/container";
import { AccountTabs } from "@/components/account/account-tabs";
import { EntryCard } from "@/components/account/entry-card";
import { PhoneSearchForm } from "@/components/account/phone-search-form";
import { getEntriesByPhone, isValidPhone } from "@/lib/api/account";
import type { AccountGroup } from "@/types/account";

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function AccountBrowser({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const phone = first(params.phone)?.trim() ?? "";
  const tab: AccountGroup = first(params.tab) === "orders" ? "order" : "booking";

  const hasPhone = phone !== "";
  const phoneValid = hasPhone && isValidPhone(phone);
  const entries = phoneValid ? await getEntriesByPhone(phone) : [];

  const bookings = entries.filter((entry) => entry.group === "booking");
  const orders = entries.filter((entry) => entry.group === "order");
  const visible = tab === "order" ? orders : bookings;

  return (
    <section className="py-12 md:py-[72px]">
      <Container className="flex flex-col gap-8 md:gap-10">
        <PhoneSearchForm
          defaultPhone={phone}
          tab={tab}
          error={
            hasPhone && !phoneValid
              ? "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)"
              : undefined
          }
        />

        {!hasPhone && (
          <p className="text-center text-ink-2">
            বুকিং বা অর্ডারের অবস্থা দেখতে আপনার মোবাইল নম্বর দিন।
          </p>
        )}

        {phoneValid && (
          <>
            <AccountTabs
              phone={phone}
              active={tab}
              bookingCount={bookings.length}
              orderCount={orders.length}
            />

            {visible.length > 0 ? (
              <ul className="grid items-start gap-6 lg:grid-cols-2">
                {visible.map((entry) => (
                  <li key={entry.id} className="flex">
                    <EntryCard entry={entry} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[12px] border border-line bg-surface px-5 py-10 text-center text-ink-2">
                এই নম্বরে কোনো {tab === "order" ? "অর্ডার" : "বুকিং"} পাওয়া যায়নি।
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}