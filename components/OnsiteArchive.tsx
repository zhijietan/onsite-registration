"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ONSITE_CATEGORIES, type OnsiteEventConfig } from "@/types/onsite";

interface Props {
  configs: OnsiteEventConfig[];
}

const CATEGORY_FILTERS = ["All", ...ONSITE_CATEGORIES] as const;
type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export default function OnsiteArchive({ configs }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return configs.filter((event) => {
      const matchesSearch =
        q === "" ||
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [configs, searchTerm, selectedCategory]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <div className="relative w-full md:w-64 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-[#7a6a4a] dark:text-[#a89876]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="block w-full pl-9 pr-3 py-2 border border-[#c5bead] dark:border-[#3a3220] rounded-lg leading-5 bg-[#ede8dc] dark:bg-[#2a2410] placeholder-[#7a6a4a] dark:placeholder-[#a89876] text-[#2d2600] dark:text-[#ede8dc] text-sm focus:outline-none focus:ring-1 focus:ring-[#2d2600] dark:focus:ring-[#ede8dc] transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 items-center">
          {CATEGORY_FILTERS.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${
                  active
                    ? "bg-[#2d2600] text-white dark:bg-[#ede8dc] dark:text-[#2d2600] shadow-sm"
                    : "bg-[#e0d9cc] text-[#7a6a4a] hover:text-[#2d2600] hover:bg-[#d5cebf] dark:bg-[#2a2410] dark:text-[#a89876] dark:hover:text-[#ede8dc] dark:hover:bg-[#38301c]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#7a6a4a] dark:text-[#a89876]">
          {filtered.length} {filtered.length === 1 ? "event" : "events"}
        </p>
      </div>

      {/* Grid or empty */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#7a6a4a] dark:text-[#a89876] text-sm">
            No matching events found.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-[#2d2600] dark:text-[#ede8dc] font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((event) => (
            <Link
              key={event.slug}
              href={`/${event.slug}`}
              className="group block"
            >
              <div className="aspect-square rounded-xl overflow-hidden border border-[#c5bead] dark:border-[#3a3220] group-hover:border-[#8a7a5a] dark:group-hover:border-[#a89876] group-hover:shadow-md transition-all relative">
                {event.thumbnailImg ? (
                  <div className="absolute inset-0">
                    <Image
                      src={event.thumbnailImg}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#2d2600]/80 group-hover:bg-[#2d2600]/70 transition-colors" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a3220] to-[#2d2600]" />
                )}

                <div className="relative z-10 w-full h-full flex flex-col justify-between p-3">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-[#8a9fff] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-[9px] font-bold text-[#8a9fff] uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>

                  <div>
                    <p className="text-[#c5b060] text-[10px] font-bold uppercase tracking-wide mb-1.5">
                      {event.dateLabel} · {event.timeLabel}
                    </p>
                    <p className="text-white text-xs font-bold leading-snug line-clamp-4">
                      {event.title}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
