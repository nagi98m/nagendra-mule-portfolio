"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { eventName: AnalyticsEvent; metadata?: Record<string, string>; children: ReactNode };

export function TrackedLink({ eventName, metadata, children, onClick, ...props }: Props) {
  return <a {...props} onClick={(event) => { trackEvent(eventName, metadata); onClick?.(event); }}>{children}</a>;
}
