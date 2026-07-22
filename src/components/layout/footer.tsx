import { BriefcaseBusiness, CodeXml, Mail } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const { socials } = portfolio;
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><span className="brand-mark">NM</span><p>Python backend engineering meets production AI.</p></div>
        <div className="footer-links" aria-label="Social links">
          {socials.github ? <TrackedLink href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" eventName="github_click" metadata={{ source: "footer" }}><CodeXml /></TrackedLink> : null}
          {socials.linkedin ? <TrackedLink href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" eventName="linkedin_click" metadata={{ source: "footer" }}><BriefcaseBusiness /></TrackedLink> : null}
          {socials.email ? <a href={`mailto:${socials.email}`} aria-label="Email"><Mail /></a> : null}
        </div>
        <p className="copyright">© {new Date().getFullYear()} Nagendra Mule</p>
      </div>
    </footer>
  );
}
