export type MedicineCategoryKey =
  | "fever-pain"
  | "gastric"
  | "allergy"
  | "diarrhea"
  | "wound-skin";

export type MedicineCategory = {
  key: MedicineCategoryKey;
  label: string;
};

export type Medicine = {
  slug: string;
  name: string;
  usage: string;
  category: MedicineCategoryKey;
  unitPrice: number;
  unit: string;
  /** stepper protiবার koto kore barbe/kombe; minimum qty-o eta */
  step: number;
  image: string;
  needsPrescription?: boolean;
};