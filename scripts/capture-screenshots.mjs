import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'website', 'public', 'screenshots');

const pages = [
  {
    name: 'government',
    file: 'government.html',
    dir: 'starter-government',
    shots: [
      { name: 'homepage', scroll: 0 },
      { name: 'services', scroll: 600 },
      { name: 'news', scroll: 1100 },
    ],
  },
  {
    name: 'nonprofit',
    file: 'nonprofit.html',
    dir: 'starter-nonprofit',
    shots: [
      { name: 'homepage', scroll: 0 },
      { name: 'stories', scroll: 800 },
      { name: 'campaign', scroll: 1500 },
    ],
  },
  {
    name: 'healthcare',
    file: 'healthcare.html',
    dir: 'starter-healthcare',
    shots: [
      { name: 'homepage', scroll: 0 },
      { name: 'services', scroll: 550 },
      { name: 'providers', scroll: 1050 },
    ],
  },
  {
    name: 'legal',
    file: 'legal.html',
    dir: 'starter-legal',
    shots: [
      { name: 'homepage', scroll: 0 },
      { name: 'practices', scroll: 600 },
      { name: 'results', scroll: 1150 },
    ],
  },
  {
    name: 'saas',
    file: 'saas.html',
    dir: 'starter-saas',
    shots: [
      { name: 'homepage', scroll: 0 },
      { name: 'features', scroll: 850 },
      { name: 'pricing', scroll: 1450 },
    ],
  },
];

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const site of pages) {
    console.log(`Capturing ${site.name}...`);

    const dir = join(screenshotsDir, site.dir);
    mkdirSync(dir, { recursive: true });

    const page = await context.newPage();
    await page.goto(`file://${join(__dirname, 'mockups', site.file)}`);
    await page.waitForTimeout(500);

    for (const shot of site.shots) {
      await page.evaluate((y) => window.scrollTo(0, y), shot.scroll);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: join(dir, `${shot.name}.png`),
      });
    }

    await page.close();
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
