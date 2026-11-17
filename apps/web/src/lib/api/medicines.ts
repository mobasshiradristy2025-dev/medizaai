import { MEDICINES, MEDICINE_CATEGORIES } from "@/data/medicines";
import type { Medicine, MedicineCategoryKey } from "@/types/medicine";

export type MedicineFilters = {
  q?: string;
  category?: MedicineCategoryKey;
};

export async function getMedicines(
  filters: MedicineFilters = {},
): Promise<Medicine[]> {
  const { q = "", category } = filters;
  const query = q.trim().toLowerCase();

  return MEDICINES.filter((medicine) => {
    if (category && medicine.category !== category) return false;
    if (
      query &&
      !`${medicine.name} ${medicine.usage}`.toLowerCase().includes(query)
    ) {
      return false;
    }
    return true;
  });
}

export function getMedicineCategories() {
  return MEDICINE_CATEGORIES;
}

export function isMedicineCategory(
  value: string | undefined,
): value is MedicineCategoryKey {
  return MEDICINE_CATEGORIES.some((category) => category.key === value);
}