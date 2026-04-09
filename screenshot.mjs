import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:5173/');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/sygnaly-dashboard.png' });

await page.click('a[href="/riesgos"]');
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/sygnaly-sidebar-nav.png' });

await browser.close();
console.log('done');
