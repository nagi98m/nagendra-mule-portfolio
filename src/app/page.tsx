import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { RecruiterQuickView } from "@/components/sections/recruiter-quick-view";

export default function Home() {
  return <main><Hero /><RecruiterQuickView /><About /><Experience /><Skills /><FeaturedProjects /><Credentials /><Contact /></main>;
}
