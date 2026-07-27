import { profileConfig } from "@/config/profile";

export const siteUrl = profileConfig.siteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: profileConfig.name,
  title: "Nagendra Mule | Python Backend & Generative AI Engineer",
  description:
    "Python Backend and Generative AI Engineer building agentic AI systems, hybrid RAG pipelines, voice automation and cloud-native platforms using FastAPI, LangGraph, AWS and GCP.",
  url: siteUrl,
};
