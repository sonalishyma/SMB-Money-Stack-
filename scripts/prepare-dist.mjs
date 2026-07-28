import { cp, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const exportUrl = new URL("../out/", import.meta.url);
const distUrl = new URL("../dist/", import.meta.url);

const exportStats = await stat(exportUrl);
if (!exportStats.isDirectory()) {
  throw new Error(`Static export was not created at ${fileURLToPath(exportUrl)}`);
}

await rm(distUrl, { recursive: true, force: true });
await cp(exportUrl, distUrl, { recursive: true });

console.log(`Static deployment prepared at ${fileURLToPath(distUrl)}`);
