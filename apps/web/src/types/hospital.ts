export type Hospital = {
  slug: string;
  name: string;
  area: string;
  type: string;
  image: string;
  listImage?: string;
  address?: string;
  phone?: string;
  popular?: boolean;
  verified?: boolean;
};