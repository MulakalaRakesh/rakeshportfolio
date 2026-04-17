const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const htmlFile = path.resolve(__dirname, 'speemeet-promo.html');
  const outDir = path.resolve(__dirname, 'video-out');

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: outDir,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();

  // Load the promo HTML
  await page.goto('file://' + htmlFile);

  // Wait for fonts to load
  await page.waitForTimeout(1000);

  // Reload so animation starts fresh after fonts
  await page.reload();
  await page.waitForTimeout(500);

  console.log('Recording 52 seconds of animation...');
  await page.waitForTimeout(52000);

  console.log('Done recording. Closing...');
  await context.close();
  await browser.close();

  const fs = require('fs');
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    const src = path.join(outDir, files[0]);
    const dest = path.resolve(__dirname, 'speemeet-promo.webm');
    fs.renameSync(src, dest);
    fs.rmdirSync(outDir);
    console.log('Video saved to: speemeet-promo.webm');
  }
})();
