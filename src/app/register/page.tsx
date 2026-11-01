import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <main className="flex-1">
      <section className="bg-ivory-deep py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <AuthCard variant="register" />
        </div>
      </section>
    </main>
  );
}
