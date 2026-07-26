import { copyFile, mkdir, rename, rm } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = resolve(projectRoot, "dist");
const stagingDir = resolve(projectRoot, ".sites-static-output");

await rm(stagingDir, { force: true, recursive: true });
await rename(outputDir, stagingDir);
await mkdir(outputDir, { recursive: true });
await rename(stagingDir, resolve(outputDir, "client"));
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
