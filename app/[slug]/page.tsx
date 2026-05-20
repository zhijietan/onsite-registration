import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEventConfigs, getEventConfigBySlug } from "@/config/events";
import GrandOpeningPage from "@/components/rsvp/GrandOpeningPage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllEventConfigs().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventConfigBySlug(slug);
  if (!event) return { title: "Not found | Onsite Archive" };
  return {
    title: `${event.title} | Onsite Archive`,
    description: `${event.dateLabel} · ${event.timeLabel} · ${event.location}`,
  };
}

// PHASE_2_TODO: Replace this placeholder with the real RSVP page once HTML lands.
export default async function OnsiteEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventConfigBySlug(slug);
  if (!event) notFound();

  // Event-specific RSVP pages
  if (
    event.slug === "GrandOpening20260530" ||
    event.slug === "GrandOpening20260613"
  ) {
    return <GrandOpeningPage slug={event.slug} />;
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#7a6a4a] dark:text-[#9a8c72] hover:text-[#2d2600] dark:hover:text-[#ede8dc] mb-8"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to archive
        </Link>

        <span className="text-[10px] font-bold text-[#8a9fff] uppercase tracking-wider">
          {event.category}
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
          {event.title}
        </h1>
        <p className="mt-4 text-sm font-bold text-[#7a6a4a] dark:text-[#9a8c72] uppercase tracking-wide">
          {event.dateLabel} · {event.timeLabel}
        </p>
        <p className="mt-1 text-sm text-[#7a6a4a] dark:text-[#9a8c72]">
          {event.location}
          {event.venueAddress ? ` — ${event.venueAddress}` : ""}
        </p>

        <div className="mt-10 p-6 rounded-xl border border-[#c5bead] dark:border-[#252318] bg-[#e0d9cc] dark:bg-[#1c1a12]">
          <p className="text-sm text-[#2d2600] dark:text-[#ede8dc] font-bold">
            RSVP details coming soon.
          </p>
          <p className="mt-2 text-sm text-[#7a6a4a] dark:text-[#9a8c72]">
            This event page is being prepared. Check back closer to the event
            date for registration details.
          </p>
        </div>
      </div>
    </main>
  );
}
