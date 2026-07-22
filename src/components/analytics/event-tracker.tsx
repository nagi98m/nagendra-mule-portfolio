"use client";

import { useEffect } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

export function EventTracker({ event, metadata }: { event: AnalyticsEvent; metadata?: Record<string, string> }) {
  useEffect(() => trackEvent(event, metadata), [event, metadata]);
  return null;
}
