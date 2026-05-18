import type { OnsiteEventConfig } from "@/types/onsite";
import grandOpening20260530 from "./GrandOpening20260530";

const allConfigs: OnsiteEventConfig[] = [grandOpening20260530];

export function getAllEventConfigs(): OnsiteEventConfig[] {
  return [...allConfigs].sort((a, b) => b.date.localeCompare(a.date));
}

export function getEventConfigBySlug(
  slug: string
): OnsiteEventConfig | undefined {
  return allConfigs.find((c) => c.slug === slug);
}
