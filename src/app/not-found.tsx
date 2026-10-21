import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-8">
      <p className="font-mono text-accent">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">That page doesn&apos;t exist, or it moved.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-ink">
        Back home
      </Link>
    </div>
  );
}
