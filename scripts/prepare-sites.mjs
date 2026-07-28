import { copyFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const serverEntryUrl = new URL("../dist/server/index.js", import.meta.url);
const sourceMetadataUrl = new URL("../.openai/hosting.json", import.meta.url);
const outputMetadataDirectoryUrl = new URL("../dist/.openai/", import.meta.url);
const outputMetadataUrl = new URL("hosting.json", outputMetadataDirectoryUrl);

const serverEntryStats = await stat(serverEntryUrl);
if (!serverEntryStats.isFile()) {
  throw new Error(
    `vinext server entry was not created at ${fileURLToPath(serverEntryUrl)}`
  );
}

await mkdir(outputMetadataDirectoryUrl, { recursive: true });
await copyFile(sourceMetadataUrl, outputMetadataUrl);

console.log(
  `Sites artifact prepared at ${fileURLToPath(new URL("../dist/", import.meta.url))}`
);
