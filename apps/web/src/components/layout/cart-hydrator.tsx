"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export function CartHydrator() {
  useEffect(() => {
    Promise.resolve(useCartStore.persist.rehydrate()).then(() => {
      useCartStore.setState({ hydrated: true });
    });
  }, []);

  return null;
}