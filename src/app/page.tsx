import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { EngineeringImpact } from "@/components/sections/engineering-impact";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { IndustryExperience } from "@/components/sections/industry-experience";
import { Skills } from "@/components/sections/skills";
import { RecruiterQuickView } from "@/components/sections/recruiter-quick-view";
import { Testimonials } from "@/components/sections/testimonials";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return <main><Hero /><RecruiterQuickView /><EngineeringImpact /><About /><Skills /><IndustryExperience /><FeaturedProjects /><Writing /><Experience /><Credentials /><Testimonials /><Contact /></main>;
}
