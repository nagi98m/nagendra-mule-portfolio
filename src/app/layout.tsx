import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AIResumeLoader } from "@/components/ai/ai-resume-loader";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Nagendra Mule" },
  description: siteConfig.description,
  keywords: ["Python Engineer", "Generative AI Engineer", "FastAPI", "LangGraph", "LangChain", "RAG", "Agentic AI", "AWS", "GCP"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: siteConfig.name, title: siteConfig.title, description: siteConfig.description },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${siteConfig.url}/#person`, name: portfolio.name, jobTitle: portfolio.role, email: portfolio.socials.email ? `mailto:${portfolio.socials.email}` : undefined, homeLocation: { "@type": "Place", name: portfolio.location }, url: siteConfig.url, knowsAbout: ["Python", "FastAPI", "Generative AI", "LangGraph", "RAG", "Agentic AI", "Voice AI", "AWS", "GCP", "PostgreSQL"], sameAs: [portfolio.socials.github, portfolio.socials.linkedin].filter(Boolean) },
    { "@type": "ProfilePage", "@id": `${siteConfig.url}/#profile`, name: siteConfig.title, url: siteConfig.url, description: siteConfig.description, mainEntity: { "@id": `${siteConfig.url}/#person` } },
    { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: `${portfolio.name} Portfolio`, url: siteConfig.url, description: siteConfig.description },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body><a className="skip-link" href="#main-content">Skip to content</a><Navbar resumeUrl={portfolio.resumeUrl} /><div id="main-content">{children}</div><Footer /><AIResumeLoader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><Script id="reset-scroll-on-reload" strategy="beforeInteractive">{`try{history.scrollRestoration="manual";const n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){if(location.hash)history.replaceState(null,"",location.pathname+location.search);scrollTo(0,0);addEventListener("DOMContentLoaded",()=>scrollTo(0,0),{once:true})}}catch{}`}</Script></body>
    </html>
  );
}
