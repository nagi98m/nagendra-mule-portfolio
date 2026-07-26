import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = resolve(projectRoot, "dist");

await mkdir(resolve(outputDir, "server"), { recursive: true });
await mkdir(resolve(outputDir, ".openai"), { recursive: true });

await copyFile(
  resolve(projectRoot, "worker", "index.js"),
  resolve(outputDir, "server", "index.js"),
);
await copyFile(
  resolve(projectRoot, ".openai", "hosting.json"),
  resolve(outputDir, ".openai", "hosting.json"),
);
