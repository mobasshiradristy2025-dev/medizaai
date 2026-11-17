export type BookingType = "doctor" | "guide" | "order";

export type BookingSummaryRow = {
  label: string;
  value: string;
};

export type BookingSummary = {
  bookingNumber: string;
  rows: BookingSummaryRow[];
  status: string;
  note: string;
};