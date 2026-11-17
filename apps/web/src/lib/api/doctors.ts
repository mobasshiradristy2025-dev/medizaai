import { DOCTORS } from "@/data/doctors";
import type { Doctor } from "@/types/doctor";

export type DoctorSort = "fee-asc" | "fee-desc";

export type DoctorFilters = {
  q?: string;
  specialties?: string[];
  videoOnly?: boolean;
  sort?: DoctorSort;
};

export async function getDoctors(
  filters: DoctorFilters = {},
): Promise<Doctor[]> {
  const { q = "", specialties = [], videoOnly = false, sort } = filters;
  const query = q.trim().toLowerCase();

  let result = DOCTORS.filter((doctor) => {
    if (query && !`${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query)) {
      return false;
    }
    if (specialties.length > 0 && !specialties.includes(doctor.specialty)) {
      return false;
    }
    if (videoOnly && !doctor.videoAvailable) return false;
    return true;
  });

  if (sort) {
    result = [...result].sort((a, b) =>
      sort === "fee-asc" ? a.fee - b.fee : b.fee - a.fee,
    );
  }
  return result;
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  return DOCTORS.find((doctor) => doctor.slug === slug) ?? null;
}

export async function getOtherDoctors(
  slug: string,
  count: number,
): Promise<Doctor[]> {
  return DOCTORS.filter((doctor) => doctor.slug !== slug).slice(0, count);
}

export function getAllDoctorSlugs(): string[] {
  return DOCTORS.map((doctor) => doctor.slug);
}

export function getSpecialties(): string[] {
  return [...new Set(DOCTORS.map((doctor) => doctor.specialty))];
}

export function getFeeRange(): { min: number; max: number } {
  const fees = DOCTORS.map((doctor) => doctor.fee);
  return { min: Math.min(...fees), max: Math.max(...fees) };
}