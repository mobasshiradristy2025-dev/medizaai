import { ACCOUNT_ENTRIES } from "@/data/account-entries";
import { doctorBookingSchema } from "@/lib/validations/booking";
import type { AccountEntry } from "@/types/account";

export function isValidPhone(value: string): boolean {
  return doctorBookingSchema.shape.phone.safeParse(value).success;
}

export async function getEntriesByPhone(phone: string): Promise<AccountEntry[]> {
  return ACCOUNT_ENTRIES.filter((entry) => entry.phone === phone);
}