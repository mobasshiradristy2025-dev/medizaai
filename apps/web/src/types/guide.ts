export type GuidePackageKey = "normal" | "extra" | "premium";

export type GuidePackage = {
  key: GuidePackageKey;
  label: string;
  price: number;
};

export type Guide = {
  slug: string;
  name: string;
  experienceYears: number;
  description: string;
  startingPrice: number;
  packages: GuidePackage[];
  image: string;
  listImage?: string;
};