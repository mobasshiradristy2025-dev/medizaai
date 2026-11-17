"use client";

import { Children, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COLUMN_CLASSES = {
  3: "lg:basis-[calc((100%-48px)/3)]",
  4: "lg:basis-[calc((100%-72px)/4)]",
} as const;

type CarouselProps = {
  children: React.ReactNode;
  columns?: keyof typeof COLUMN_CLASSES;
  prevLabel?: string;
  nextLabel?: string;
};

export function Carousel({
  children,
  columns = 4,
  prevLabel = "আগেরটি",
  nextLabel = "পরেরটি",
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector("li");
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + 24
      : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-10 md:gap-[60px]">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <li
            className={`flex shrink-0 basis-full snap-start sm:basis-[calc((100%-24px)/2)] ${COLUMN_CLASSES[columns]}`}
          >
            {child}
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={prevLabel}
          className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-brand-700 transition-colors hover:border-brand-700"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={nextLabel}
          className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-brand-700 transition-colors hover:border-brand-700"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}