import { OFFICE_LOCATION } from "@/lib/constants";

export function ContactMap() {
  const { lat, lng, label } = OFFICE_LOCATION;

  // Map-er dekhar area (lat/lng-er chardike ektu jayga)
  const lngDelta = 0.01;
  const latDelta = 0.006;
  const bbox = [
    lng - lngDelta,
    lat - latDelta,
    lng + lngDelta,
    lat + latDelta,
  ].join("%2C");

 const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="h-[220px] w-full overflow-hidden rounded-[12px] border border-line bg-ph">
      <iframe
        title={`${label}-এর ম্যাপ`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}