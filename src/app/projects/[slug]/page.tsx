import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { EventTracker } from "@/components/analytics/event-tracker";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.seoTitle, description: project.summary, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { title: `${project.seoTitle} | Nagendra Mule`, description: project.summary, url: `/projects/${project.slug}` } };
}

function DetailSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="case-section"><div className="case-label">{number}</div><div><h2>{title}</h2>{children}</div></section>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="detail-list">{items.map((item) => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <main className="case-page">
      <EventTracker event="project_view" metadata={{ project: project.slug }} />
      <div className="container case-hero"><Link className="back-link" href="/#projects"><ArrowLeft size={16} /> Back to projects</Link><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p><p className="case-summary">{project.summary}</p>{project.slug === "tag-ai-platform" ? <div className="case-impact"><strong>~60% less manual QA effort</strong><span>Supported impact from requirement and test automation workflows.</span></div> : null}<div className="private-label"><LockKeyhole size={15} /> Enterprise project · Source code private</div></div>
      <div className="container case-content">
        <DetailSection number="01" title="Overview"><p>{project.summary}</p></DetailSection>
        <DetailSection number="02" title="Problem"><p>{project.problem}</p></DetailSection>
        <DetailSection number="03" title="My role"><BulletList items={project.role} /></DetailSection>
        <DetailSection number="04" title="Solution"><p>{project.solution}</p></DetailSection>
        <DetailSection number="05" title="System architecture"><ArchitectureDiagram steps={project.architecture} title={project.title} /></DetailSection>
        <DetailSection number="06" title="Technical implementation"><BulletList items={project.implementation} /></DetailSection>
        <DetailSection number="07" title="Key engineering decisions"><BulletList items={project.decisions} /></DetailSection>
        <DetailSection number="08" title="Key features"><BulletList items={project.features} /></DetailSection>
        <DetailSection number="09" title="Security"><BulletList items={project.security} /></DetailSection>
        <DetailSection number="10" title="Engineering challenges"><BulletList items={project.challenges} /></DetailSection>
        <DetailSection number="11" title="Results & impact"><BulletList items={project.impact} /></DetailSection>
        <DetailSection number="12" title="Technology stack"><div className="tag-row">{project.technologies.map((item) => <span className="tag tag-primary" key={item}>{item}</span>)}</div></DetailSection>
        <DetailSection number="13" title="Engineering takeaways"><BulletList items={project.takeaways} /></DetailSection>
        <nav className="project-pagination" aria-label="Project case studies"><Link href={`/projects/${previous.slug}`}><ArrowLeft /> <span><small>Previous</small>{previous.title}</span></Link><Link href={`/projects/${next.slug}`}><span><small>Next</small>{next.title}</span><ArrowRight /></Link></nav>
      </div>
    </main>
  );
}
