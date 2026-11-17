import {
  HOSPITALS,
  HOSPITAL_TYPES,
  type HospitalType,
} from "@/data/hospitals";
import type { Hospital } from "@/types/hospital";

export type HospitalFilters = {
  q?: string;
  type?: HospitalType;
};

/** Shudhu yachai kora hospital (guide booking-er select ityadi-r jonno) */
export async function getHospitals(): Promise<Hospital[]> {
  return HOSPITALS.filter((hospital) => hospital.verified !== false);
}

/** Directory page: shob hospital, search ar type diye filter kora */
export async function searchHospitals(
  filters: HospitalFilters = {},
): Promise<Hospital[]> {
  const { q = "", type } = filters;
  const query = q.trim().toLowerCase();

  return HOSPITALS.filter((hospital) => {
    if (type && hospital.type !== type) return false;
    if (
      query &&
      !`${hospital.name} ${hospital.area} ${hospital.type}`
        .toLowerCase()
        .includes(query)
    ) {
      return false;
    }
    return true;
  });
}

export function getHospitalTypes(): readonly HospitalType[] {
  return HOSPITAL_TYPES;
}

export function getHospitalCount(): number {
  return HOSPITALS.length;
}

export function isHospitalType(value: string | undefined): value is HospitalType {
  return (HOSPITAL_TYPES as readonly string[]).includes(value ?? "");
}