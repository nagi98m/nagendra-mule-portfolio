"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ResumeLink } from "@/components/ui/resume-link";

const navItems = ["About", "Experience", "Skills", "Projects", "Certifications", "Contact"];

export function Navbar({ resumeUrl }: { resumeUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Nagendra Mule, back to home">
          <span className="brand-mark">NM</span>
          <span>Nagendra Mule</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </nav>
        <div className="nav-action"><ResumeLink href={resumeUrl} compact /></div>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
          <ResumeLink href={resumeUrl} />
        </nav>
      ) : null}
    </header>
  );
}
