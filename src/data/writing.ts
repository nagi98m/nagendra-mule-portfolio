import type { WritingArticle } from "@/types/portfolio";

export const writingArticles: WritingArticle[] = [
  { slug: "safe-langgraph-human-approval", title: "Designing Safe LangGraph Workflows with Human Approval", summary: null, published: false, publishedAt: null, url: null },
  { slug: "hybrid-retrieval-dense-bm25", title: "Building Hybrid Retrieval with Dense Search and BM25", summary: null, published: false, publishedAt: null, url: null },
  { slug: "citation-verification-enterprise-rag", title: "Citation Verification for Enterprise RAG", summary: null, published: false, publishedAt: null, url: null },
  { slug: "secure-multi-tenant-fastapi", title: "Securing Multi-Tenant FastAPI Applications", summary: null, published: false, publishedAt: null, url: null },
  { slug: "amazon-connect-lex-voice-architecture", title: "Amazon Connect and Lex Voice Automation Architecture", summary: null, published: false, publishedAt: null, url: null },
  { slug: "websockets-long-running-ai-workflows", title: "WebSockets for Long-Running AI Workflows", summary: null, published: false, publishedAt: null, url: null },
  { slug: "evaluating-agentic-ai-pipelines", title: "Evaluating Agentic AI Pipelines", summary: null, published: false, publishedAt: null, url: null },
  { slug: "reducing-lambda-cold-starts", title: "Reducing AWS Lambda Cold Starts", summary: null, published: false, publishedAt: null, url: null },
];

export const publishedArticles = writingArticles.filter(
  (article): article is WritingArticle & { url: string; summary: string; publishedAt: string } =>
    article.published && Boolean(article.url && article.summary && article.publishedAt),
);
