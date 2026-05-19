export const ONSITE_CATEGORIES = [
  "Big Events",
  "Licensed Training",
  "EC",
  "Office",
] as const;

export type OnsiteCategory = (typeof ONSITE_CATEGORIES)[number];

export interface OnsiteEventConfig {
  slug: string;
  title: string;
  category: OnsiteCategory;
  date: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  venueAddress?: string;
  thumbnailImg?: string;
  rsvpUrl?: string;
  hasRsvpPage?: boolean;
}
