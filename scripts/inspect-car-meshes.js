import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => window.__CAR__ !== undefined, { timeout: 15000 });

  const meshInfo = await page.evaluate(() => {
    const list = [];
    window.__CAR__.traverse((child) => {
      list.push({
        name: child.name,
        type: child.type,
        isMesh: !!child.isMesh,
        material: child.material ? (Array.isArray(child.material) ? child.material.map(m => m.name) : child.material.name) : null,
        parent: child.parent ? child.parent.name : null
      });
    });
    return list;
  });

  console.log('Total children in car:', meshInfo.length);
  console.log(JSON.stringify(meshInfo.filter(m => m.isMesh), null, 2));

  await browser.close();
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});

