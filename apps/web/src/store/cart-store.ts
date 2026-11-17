import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  name: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  /** localStorage theke cart load hoye gele true (server/client mismatch ar flash thekate) */
  hydrated: boolean;
  addItem: (item: Omit<CartLine, "qty">, qty: number) => void;
  clear: () => void;
};

export function getSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      hydrated: false,
      addItem: (item, qty) =>
        set((state) => {
          const existing = state.lines.find((line) => line.slug === item.slug);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.slug === item.slug
                  ? { ...line, qty: line.qty + qty }
                  : line,
              ),
            };
          }
          return { lines: [...state.lines, { ...item, qty }] };
        }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "medizaai-cart",
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);