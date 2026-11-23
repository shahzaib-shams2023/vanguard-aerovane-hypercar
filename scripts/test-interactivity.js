import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testInteractivity() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for model load
  await page.waitForFunction(() => window.__CAR__ !== undefined, { timeout: 15000 });
  console.log('✓ Model loaded successfully');

  // Test Scroll Navigation to Chapter 6 (Atelier)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll);
  });
  await new Promise(r => setTimeout(r, 1500));
  console.log('✓ Scrolled to Chapter 06 Atelier');

  // Click on Giallo Modena (Yellow) swatch
  const yellowButton = await page.$('button[data-cursor="Giallo Modena Yellow"]');
  if (yellowButton) {
    await yellowButton.click();
    console.log('✓ Clicked Giallo Modena yellow paint swatch');
  }

  // Click V-MAX aero toggle
  const vmaxButtons = await page.$$('button');
  for (const b of vmaxButtons) {
    const text = await (await b.getProperty('innerText')).jsonValue();
    if (text && text.includes('415 KM/H V-MAX')) {
      await b.click();
      console.log('✓ Toggled V-MAX aerodynamic mode');
      break;
    }
  }

  // Click Reserve Chassis Allocation
  const reserveBtn = await page.$('button[data-cursor="ALLOCATION"]');
  if (reserveBtn) {
    await reserveBtn.click();
    console.log('✓ Clicked Reserve Chassis Allocation button');
  }

  await new Promise(r => setTimeout(r, 800));

  // Check if Drawer is open
  const isDrawerOpen = await page.evaluate(() => {
    return document.body.innerText.includes('ALLOCATION SPECIFICATION') || document.body.innerText.includes('CHASSIS ALLOCATION');
  });
  console.log('✓ Chassis Drawer Opened:', isDrawerOpen);

  await page.screenshot({ path: './screenshots-current/06-drawer-open.png' });
  console.log('✓ Saved screenshot of open allocation drawer');

  await browser.close();
}

testInteractivity().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

