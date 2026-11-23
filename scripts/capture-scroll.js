import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = './screenshots-current';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for car model to finish loading (loading overlay disappears)
  console.log('Waiting for model to load...');
  await page.waitForFunction(() => {
    return !document.body.innerText.includes('INITIALIZING V12') || !document.querySelector('.animate-ping');
  }, { timeout: 15000 }).catch(() => console.log('Timeout waiting for loader disappear, continuing...'));

  await new Promise(r => setTimeout(r, 2000));

  const scrollPoints = [
    { label: '00-hero', p: 0.0 },
    { label: '01-design-flanks', p: 0.22 },
    { label: '02-performance-exhaust', p: 0.45 },
    { label: '03-engineering-top', p: 0.65 },
    { label: '04-cockpit-interior', p: 0.82 },
    { label: '05-configurator-atelier', p: 1.0 }
  ];

  for (const pt of scrollPoints) {
    console.log(`Scrolling to ${pt.label} (${pt.p * 100}%)...`);
    await page.evaluate((progress) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * progress);
    }, pt.p);

    // Wait for smooth lerp and animations to settle
    await new Promise(r => setTimeout(r, 1200));

    const shotPath = path.join(OUT_DIR, `${pt.label}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot to ${shotPath}`);
  }

  await browser.close();
  console.log('Done captures!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

