import { copyFile, cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const exportDirectoryUrl = new URL("../out/", import.meta.url);
const exportIndexUrl = new URL("index.html", exportDirectoryUrl);
const exportNotFoundUrl = new URL("404.html", exportDirectoryUrl);
const outputDirectoryUrl = new URL("../dist/", import.meta.url);
const outputClientUrl = new URL("client/", outputDirectoryUrl);
const outputServerUrl = new URL("server/", outputDirectoryUrl);
const serverEntryUrl = new URL("index.js", outputServerUrl);
const sourceMetadataUrl = new URL("../.openai/hosting.json", import.meta.url);
const outputMetadataDirectoryUrl = new URL(".openai/", outputDirectoryUrl);
const outputMetadataUrl = new URL("hosting.json", outputMetadataDirectoryUrl);

const exportIndexStats = await stat(exportIndexUrl);
if (!exportIndexStats.isFile()) {
  throw new Error(
    `Next.js static export was not created at ${fileURLToPath(exportIndexUrl)}`
  );
}

await rm(outputDirectoryUrl, { recursive: true, force: true });
await mkdir(outputServerUrl, { recursive: true });
await mkdir(outputMetadataDirectoryUrl, { recursive: true });
await cp(exportDirectoryUrl, outputClientUrl, { recursive: true });

const indexHtml = await readFile(exportIndexUrl, "utf8");
const notFoundHtml = await readFile(exportNotFoundUrl, "utf8");
const workerSource = `const indexHtml = ${JSON.stringify(indexHtml)};
const notFoundHtml = ${JSON.stringify(notFoundHtml)};
const htmlHeaders = {
  "cache-control": "public, max-age=0, must-revalidate",
  "content-type": "text/html; charset=utf-8",
  "x-content-type-options": "nosniff",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const isHead = request.method === "HEAD";

    if (request.method !== "GET" && !isHead) {
      return new Response(null, {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(isHead ? null : indexHtml, { headers: htmlHeaders });
    }

    return new Response(isHead ? null : notFoundHtml, {
      status: 404,
      headers: htmlHeaders,
    });
  },
};
`;

await writeFile(serverEntryUrl, workerSource);
await copyFile(sourceMetadataUrl, outputMetadataUrl);

console.log(
  `Sites artifact prepared at ${fileURLToPath(outputDirectoryUrl)}`
);
