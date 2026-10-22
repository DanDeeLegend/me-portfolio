import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-36 text-center sm:px-8">
      <Mascot mood="confused" className="mx-auto w-48" />
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">Page not found</h1>
      <p className="font-hand mt-3 text-3xl text-accent">I looked everywhere. Even under the plaid.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-ink">
        Back home
      </Link>
    </div>
  );
}
