import Link from "next/link";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />
      <main className="flex flex-col items-center justify-center gap-6 bg-line/25 px-5 py-12">
        {/* Mobile e left panel nei, tai logo ekhane */}
        <Link
          href="/"
          className="flex items-center gap-[10px] lg:hidden"
          aria-label="Medizaai হোম"
        >
          <span className="flex size-10 items-center justify-center rounded-[20px] bg-brand-700 text-[20px] leading-[30px] font-bold text-white">
            M
          </span>
          <span className="text-[26px] leading-[39px] font-bold text-brand-900">
            Medizaai
          </span>
        </Link>
        {children}
      </main>
    </div>
  );
}