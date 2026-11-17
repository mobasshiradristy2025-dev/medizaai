export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  specialty: string;
  fee: number;
  videoAvailable: boolean;
  experienceYears?: number;
  bio?: string;
  image: string;
};