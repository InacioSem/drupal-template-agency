import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'website', 'public', 'screenshots');

const pages = [
  { name: 'government', file: 'government.html', dir: 'starter-government', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 600 }, { name: 'news', scroll: 1100 }] },
  { name: 'nonprofit', file: 'nonprofit.html', dir: 'starter-nonprofit', shots: [{ name: 'homepage', scroll: 0 }, { name: 'stories', scroll: 800 }, { name: 'campaign', scroll: 1500 }] },
  { name: 'healthcare', file: 'healthcare.html', dir: 'starter-healthcare', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 550 }, { name: 'providers', scroll: 1050 }] },
  { name: 'legal', file: 'legal.html', dir: 'starter-legal', shots: [{ name: 'homepage', scroll: 0 }, { name: 'practices', scroll: 600 }, { name: 'results', scroll: 1150 }] },
  { name: 'saas', file: 'saas.html', dir: 'starter-saas', shots: [{ name: 'homepage', scroll: 0 }, { name: 'features', scroll: 850 }, { name: 'pricing', scroll: 1450 }] },
  { name: 'university', file: 'university.html', dir: 'starter-university', shots: [{ name: 'homepage', scroll: 0 }, { name: 'programs', scroll: 550 }, { name: 'campus', scroll: 1000 }] },
  { name: 'restaurant', file: 'restaurant.html', dir: 'starter-restaurant', shots: [{ name: 'homepage', scroll: 0 }, { name: 'menu', scroll: 550 }, { name: 'reservations', scroll: 1000 }] },
  { name: 'realestate', file: 'realestate.html', dir: 'starter-realestate', shots: [{ name: 'homepage', scroll: 0 }, { name: 'listings', scroll: 550 }, { name: 'agents', scroll: 1050 }] },
  { name: 'church', file: 'church.html', dir: 'starter-church', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 550 }, { name: 'ministries', scroll: 1000 }] },
  { name: 'hotel', file: 'hotel.html', dir: 'starter-hotel', shots: [{ name: 'homepage', scroll: 0 }, { name: 'rooms', scroll: 550 }, { name: 'amenities', scroll: 1050 }] },
  { name: 'construction', file: 'construction.html', dir: 'starter-construction', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 550 }, { name: 'projects', scroll: 1050 }] },
  { name: 'finance', file: 'finance.html', dir: 'starter-finance', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 550 }, { name: 'team', scroll: 1000 }] },
  { name: 'media', file: 'media.html', dir: 'starter-media', shots: [{ name: 'homepage', scroll: 0 }, { name: 'articles', scroll: 550 }, { name: 'newsletter', scroll: 1050 }] },
  { name: 'portfolio', file: 'portfolio.html', dir: 'starter-portfolio', shots: [{ name: 'homepage', scroll: 0 }, { name: 'work', scroll: 450 }, { name: 'about', scroll: 900 }] },
  { name: 'ecommerce', file: 'ecommerce.html', dir: 'starter-ecommerce', shots: [{ name: 'homepage', scroll: 0 }, { name: 'products', scroll: 550 }, { name: 'shipping', scroll: 1050 }] },
  { name: 'school', file: 'school.html', dir: 'starter-school', shots: [{ name: 'homepage', scroll: 0 }, { name: 'quicklinks', scroll: 500 }, { name: 'news', scroll: 950 }] },
  { name: 'association', file: 'association.html', dir: 'starter-association', shots: [{ name: 'homepage', scroll: 0 }, { name: 'benefits', scroll: 550 }, { name: 'events', scroll: 1000 }] },
  { name: 'fitness', file: 'fitness.html', dir: 'starter-fitness', shots: [{ name: 'homepage', scroll: 0 }, { name: 'classes', scroll: 550 }, { name: 'pricing', scroll: 1100 }] },
  { name: 'consulting', file: 'consulting.html', dir: 'starter-consulting', shots: [{ name: 'homepage', scroll: 0 }, { name: 'services', scroll: 550 }, { name: 'casestudies', scroll: 1050 }] },
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
      await page.screenshot({ path: join(dir, `${shot.name}.png`) });
    }
    await page.close();
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
