"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ResumeLink } from "@/components/ui/resume-link";

const navItems = ["About", "Experience", "Skills", "Projects", "Certifications", "Contact"];

export function Navbar({ resumeUrl }: { resumeUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.classList.add("navigation-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("navigation-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.toLowerCase())]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.3] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Nagendra Mule, back to home" onClick={closeMenu}>
          <span className="brand-mark">NM</span>
          <span className="brand-copy"><strong>Nagendra Mule</strong><small>AI Engineer Portfolio</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return <a key={item} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{item}</a>;
          })}
        </nav>
        <div className="nav-action"><ResumeLink href={resumeUrl} compact /></div>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <>
          <button className="mobile-nav-backdrop" type="button" aria-label="Dismiss navigation menu" onClick={closeMenu} />
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <p>Explore portfolio</p>
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return <a key={item} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={closeMenu}>{item}</a>;
            })}
            <ResumeLink href={resumeUrl} />
          </nav>
        </>
      ) : null}
    </header>
  );
}
