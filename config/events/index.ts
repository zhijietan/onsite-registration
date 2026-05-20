import type { OnsiteEventConfig } from "@/types/onsite";
import grandOpening20260530 from "./GrandOpening20260530";
import grandOpening20260613 from "./GrandOpening20260613";

const allConfigs: OnsiteEventConfig[] = [grandOpening20260530, grandOpening20260613];

export function getAllEventConfigs(): OnsiteEventConfig[] {
  return [...allConfigs].sort((a, b) => b.date.localeCompare(a.date));
}

export function getEventConfigBySlug(
  slug: string
): OnsiteEventConfig | undefined {
  return allConfigs.find((c) => c.slug === slug);
}
