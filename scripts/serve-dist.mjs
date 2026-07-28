import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".woff2", "font/woff2"],
]);

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
    let filePath = join(root, relativePath);
    const fileStats = await stat(filePath).catch(() => null);

    if (fileStats?.isDirectory()) {
      filePath = join(filePath, "index.html");
    } else if (!fileStats) {
      filePath = join(root, "404.html");
      response.statusCode = 404;
    }

    const body = await readFile(filePath);
    response.setHeader(
      "Content-Type",
      contentTypes.get(extname(filePath)) ?? "application/octet-stream"
    );
    response.end(body);
  } catch {
    response.statusCode = 500;
    response.end("Internal server error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static site ready at http://127.0.0.1:${port}`);
});
