import { getAllEventConfigs } from "@/config/events";
import OnsiteArchive from "@/components/OnsiteArchive";
import ThemeToggle from "@/components/ThemeToggle";

export default function OnsiteArchivePage() {
  const configs = getAllEventConfigs();

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2d2600] dark:bg-[#ede8dc] rounded-xl flex items-center justify-center text-[#ede8dc] dark:text-[#2d2600] shadow-sm">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <div className="w-px h-8 bg-[#c5bead] dark:bg-[#252318]" />
            <div>
              <h1 className="text-xl font-extrabold leading-tight">
                Onsite Archive
              </h1>
              <p className="text-sm text-[#7a6a4a] dark:text-[#9a8c72] mt-0.5">
                by Zhijie Tan
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {configs.length === 0 ? (
          <p className="text-[#7a6a4a] dark:text-[#9a8c72] text-sm">
            No events yet.
          </p>
        ) : (
          <OnsiteArchive configs={configs} />
        )}
      </div>
    </main>
  );
}
