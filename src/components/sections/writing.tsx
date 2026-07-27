import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { publishedArticles } from "@/data/writing";

export function Writing() {
  if (!publishedArticles.length) return null;

  return (
    <section id="writing" className="section section-soft">
      <div className="container">
        <Reveal><SectionHeading eyebrow="06 / Technical writing" title="Engineering notes from implemented systems." /></Reveal>
        <div className="writing-grid">
          {publishedArticles.map((article) => (
            <article className="writing-card" key={article.slug}>
              <time>{article.publishedAt}</time>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noreferrer">Read article <ArrowUpRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
