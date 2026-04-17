const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const htmlFile = path.resolve(__dirname, 'speemeet-promo-vertical.html');
  const outDir = path.resolve(__dirname, 'video-out-v');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    recordVideo: {
      dir: outDir,
      size: { width: 1080, height: 1920 },
    },
  });

  const page = await context.newPage();
  await page.goto('file://' + htmlFile);
  await page.waitForTimeout(1000);
  await page.reload();
  await page.waitForTimeout(500);

  console.log('Recording 52s vertical animation...');
  await page.waitForTimeout(52000);

  console.log('Done. Closing...');
  await context.close();
  await browser.close();

  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    const src = path.join(outDir, files[0]);
    const dest = path.resolve(__dirname, 'speemeet-promo-vertical.webm');
    fs.renameSync(src, dest);
    fs.rmdirSync(outDir);
    console.log('Saved: speemeet-promo-vertical.webm');
  }
})();
