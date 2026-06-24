/**
 * generate-cv.ts
 * ------------------------------------------------------------------
 * Renders the /cv page with a headless browser and saves a print-styled
 * PDF to public/cv/Thao_Thi_Phuong_Dao_CV.pdf
 *
 * Usage:
 *   1) npm run build          # produces ./out (static export)
 *   2) npm run generate-cv    # serves ./out, prints /cv to PDF
 *
 * This runs locally or in CI (see .github/workflows/deploy.yml).
 * GitHub Pages cannot generate PDFs at request time, so the PDF is a
 * build-time artifact committed/deployed alongside the static site.
 * ------------------------------------------------------------------
 */
import { createServer } from "http";
import { readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, extname } from "path";
import puppeteer from "puppeteer";

const OUT_DIR = join(process.cwd(), "out");
const PORT = 4321;
const TARGET = `/cv/`;
const PDF_PATH = join(process.cwd(), "public", "cv", "Thao_Thi_Phuong_Dao_CV.pdf");

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function startServer() {
  return new Promise<ReturnType<typeof createServer>>((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
        if (url.endsWith("/")) url += "index.html";
        let filePath = join(OUT_DIR, url);
        if (!existsSync(filePath) && existsSync(filePath + ".html")) filePath += ".html";
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error("✗ ./out not found. Run `npm run build` first.");
    process.exit(1);
  }
  await mkdir(join(process.cwd(), "public", "cv"), { recursive: true });

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${TARGET}`, { waitUntil: "networkidle0" });
  await page.emulateMediaType("print");
  await page.pdf({
    path: PDF_PATH,
    format: "A4",
    printBackground: true,
    margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
  });

  await browser.close();
  server.close();
  console.log(`✓ CV written to ${PDF_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
