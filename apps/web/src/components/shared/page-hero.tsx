import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";

type PageHeroProps = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
};

export function PageHero({ breadcrumbs, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-r from-brand-900 to-brand-700">
      <Container className="flex flex-col gap-3 py-10">
        <Breadcrumb items={breadcrumbs} light />

        <h1 className="text-[32px] leading-[42px] font-bold text-white md:text-[40px] md:leading-[50px]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-base leading-6 text-brand-100 md:text-[17px] md:leading-[26px]">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}