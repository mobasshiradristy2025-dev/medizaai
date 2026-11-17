export type AccountGroup = "booking" | "order";

export type TimelineStep = {
  label: string;
  description?: string;
  done: boolean;
};

export type AccountEntry = {
  id: string;
  group: AccountGroup;
  phone: string;
  title: string;
  subtitle: string;
  status: { label: string; tone: "success" | "info" };
  steps: TimelineStep[];
};