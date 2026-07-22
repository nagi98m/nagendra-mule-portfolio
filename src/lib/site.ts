import { profileConfig } from "@/config/profile";

export const siteUrl = profileConfig.siteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: profileConfig.name,
  title: "Nagendra Mule | Python Backend & Generative AI Engineer",
  description:
    "Python Backend and Generative AI Engineer specializing in FastAPI, LangGraph, LangChain, RAG, Agentic AI, AWS, GCP, and scalable AI platforms.",
  url: siteUrl,
};
