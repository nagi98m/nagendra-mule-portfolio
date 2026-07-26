import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeAdmin } from "@/components/resume/resume-admin";

export const metadata: Metadata = { title: "Private Resume Manager", robots: { index: false, follow: false } };

export default function ResumeAdminPage() {
  if (process.env.ENABLE_RESUME_ADMIN !== "true") notFound();
  return <ResumeAdmin />;
}
