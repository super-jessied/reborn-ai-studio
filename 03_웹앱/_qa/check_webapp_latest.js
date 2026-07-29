const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const webappDir = path.resolve(__dirname, "..");
const htmlPath = path.join(webappDir, "index.html");
const scriptPath = path.join(webappDir, "script.js");
const qaDir = __dirname;

const html = fs.readFileSync(htmlPath, "utf8");
const script = fs.readFileSync(scriptPath, "utf8");
const slideCount = (script.match(/src: "assets\/slides/g) || []).length;

if (slideCount !== 11) {
  throw new Error(`Expected 11 lecture slides, found ${slideCount}`);
}

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.waitForLoadState("networkidle");

  const title = await page.locator("h1").innerText();
  const counter = await page.locator("#slideCounter").innerText();
  const naturalWidth = await page.locator("#lectureSlideImage").evaluate((img) => img.naturalWidth);
  if (!title.includes("Re_Born")) throw new Error(`Unexpected title: ${title}`);
  if (counter.trim() !== "1 / 11") throw new Error(`Unexpected slide counter: ${counter}`);
  if (!naturalWidth) throw new Error("Lecture slide image did not load");

  await page.screenshot({ path: path.join(qaDir, "webapp-latest-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: path.join(qaDir, "webapp-latest-mobile.png"), fullPage: true });

  await browser.close();
  console.log(JSON.stringify({ ok: true, slideCount, desktop: "webapp-latest-desktop.png", mobile: "webapp-latest-mobile.png" }));
})();
