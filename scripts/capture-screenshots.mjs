import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'website', 'public', 'screenshots');

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  // Government screenshots
  console.log('Capturing Government template screenshots...');
  const govPage = await context.newPage();
  await govPage.goto(`file://${join(__dirname, 'mockups', 'government.html')}`);
  await govPage.waitForTimeout(500);

  // Full homepage view
  await govPage.screenshot({
    path: join(screenshotsDir, 'starter-government', 'homepage.png'),
  });

  // Scroll to services section
  await govPage.evaluate(() => window.scrollTo(0, 600));
  await govPage.waitForTimeout(300);
  await govPage.screenshot({
    path: join(screenshotsDir, 'starter-government', 'services.png'),
  });

  // Scroll to news section
  await govPage.evaluate(() => window.scrollTo(0, 1100));
  await govPage.waitForTimeout(300);
  await govPage.screenshot({
    path: join(screenshotsDir, 'starter-government', 'news.png'),
  });

  // Nonprofit screenshots
  console.log('Capturing Nonprofit template screenshots...');
  const npPage = await context.newPage();
  await npPage.goto(`file://${join(__dirname, 'mockups', 'nonprofit.html')}`);
  await npPage.waitForTimeout(500);

  // Full homepage view
  await npPage.screenshot({
    path: join(screenshotsDir, 'starter-nonprofit', 'homepage.png'),
  });

  // Scroll to stories section
  await npPage.evaluate(() => window.scrollTo(0, 800));
  await npPage.waitForTimeout(300);
  await npPage.screenshot({
    path: join(screenshotsDir, 'starter-nonprofit', 'stories.png'),
  });

  // Scroll to campaign section
  await npPage.evaluate(() => window.scrollTo(0, 1500));
  await npPage.waitForTimeout(300);
  await npPage.screenshot({
    path: join(screenshotsDir, 'starter-nonprofit', 'campaign.png'),
  });

  await browser.close();
  console.log('Done! Screenshots saved.');
}

capture().catch(console.error);
