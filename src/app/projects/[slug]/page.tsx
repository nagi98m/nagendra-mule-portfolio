import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, ExternalLink, LockKeyhole } from "lucide-react";
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
  const evidenceLinks = [
    ...(project.demo ? [{ label: "Live demo", url: project.demo }] : []),
    ...(project.github ? [{ label: "GitHub repository", url: project.github }] : []),
    ...(project.artifacts || []),
  ];
  return (
    <main className="case-page">
      <EventTracker event="project_view" metadata={{ project: project.slug }} />
      <div className="container case-hero"><Link className="back-link" href="/#projects"><ArrowLeft size={16} /> Back to projects</Link><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p><p className="case-summary">{project.summary}</p><div className="private-label"><LockKeyhole size={15} /> {project.projectType || "Enterprise project"} · Source code private</div></div>
      <div className="container case-content">
        <DetailSection number="01" title="Executive summary"><p>{project.solution}</p></DetailSection>
        <DetailSection number="02" title="Business problem"><p>{project.problem}</p></DetailSection>
        {project.operatingEnvironment ? <DetailSection number="03" title="Users & operating environment"><p>{project.operatingEnvironment}</p></DetailSection> : null}
        <DetailSection number="04" title="My exact role"><BulletList items={project.role} /></DetailSection>
        <DetailSection number="05" title="Technical constraints"><BulletList items={project.challenges} /></DetailSection>
        <DetailSection number="06" title="System architecture"><ArchitectureDiagram steps={project.architecture} title={project.title} /><h3 className="detail-subheading">Implementation</h3><BulletList items={project.implementation} /></DetailSection>
        {project.workflow?.length ? <DetailSection number="07" title="Request, data & workflow path"><ArchitectureDiagram steps={project.workflow} title={`${project.title} workflow`} /></DetailSection> : null}
        <DetailSection number="08" title="Key engineering decisions"><BulletList items={project.decisions} /></DetailSection>
        {project.tradeoffs?.length ? <DetailSection number="09" title="Alternatives & tradeoffs"><BulletList items={project.tradeoffs} /></DetailSection> : null}
        <DetailSection number="10" title="Security & authorization"><BulletList items={project.security} /></DetailSection>
        {project.reliability?.length ? <DetailSection number="11" title="Reliability & failure handling"><BulletList items={project.reliability} /></DetailSection> : null}
        {project.testing?.length || project.evaluation?.length ? <DetailSection number="12" title="Testing & AI evaluation"><BulletList items={project.testing || []} />{project.evaluation?.length ? <dl className="evaluation-grid">{project.evaluation.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl> : null}</DetailSection> : null}
        {project.deployment?.length ? <DetailSection number="13" title="Deployment & observability"><BulletList items={project.deployment} /><h3 className="detail-subheading">Technology stack</h3><div className="tag-row">{project.technologies.map((item) => <span className="tag tag-primary" key={item}>{item}</span>)}</div></DetailSection> : null}
        <DetailSection number="14" title="Verified results & engineering takeaways"><BulletList items={[...project.impact, ...project.takeaways]} /></DetailSection>
        {project.whatIDWouldDoDifferently?.length ? <DetailSection number="15" title="What I would do differently"><BulletList items={project.whatIDWouldDoDifferently} /></DetailSection> : null}
        {evidenceLinks.length ? <DetailSection number="16" title="Demo, repository & sanitized artifacts"><div className="evidence-links">{evidenceLinks.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<ExternalLink aria-hidden="true" /></a>)}</div></DetailSection> : null}
        <nav className="project-pagination" aria-label="Project case studies"><Link href={`/projects/${previous.slug}`}><ArrowLeft /> <span><small>Previous</small>{previous.title}</span></Link><Link href={`/projects/${next.slug}`}><span><small>Next</small>{next.title}</span><ArrowRight /></Link></nav>
      </div>
    </main>
  );
}
