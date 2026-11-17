import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "প্রবেশ করুন | Medizaai",
  description: "মোবাইল নম্বর ও কোড দিয়ে প্রবেশ করুন।",
  robots: { index: false },
};

export default function LoginPage() {
  return <LoginForm />;
}