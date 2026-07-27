import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const approved = testimonials.filter((testimonial) => testimonial.approved);
  if (!approved.length) return null;

  return (
    <section className="section section-soft" aria-label="Approved testimonials">
      <div className="container testimonial-grid">
        {approved.map((testimonial) => (
          <figure key={`${testimonial.person}-${testimonial.quote}`}>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>{testimonial.person} · {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
