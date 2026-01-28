const puppeteer = require('puppeteer');

const SITE_URL = 'https://code-examples-five.vercel.app';

async function test() {
  console.log('Testing production site:', SITE_URL, '\n');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let passed = 0, failed = 0;

  // Test 1: Homepage
  try {
    await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('h1', { timeout: 10000 });
    const h1Text = await page.$eval('h1', el => el.textContent);
    console.log('✓ Homepage loaded:', h1Text.substring(0, 40));
    passed++;
  } catch (e) {
    console.log('✗ Homepage:', e.message);
    failed++;
  }

  // Test 2: Light mode default
  try {
    const htmlClass = await page.$eval('html', el => el.className);
    if (htmlClass.includes('light')) {
      console.log('✓ Light mode is default');
      passed++;
    } else {
      console.log('✗ Light mode not default');
      failed++;
    }
  } catch (e) {
    console.log('✗ Light mode:', e.message);
    failed++;
  }

  // Test 3: Playground with 3 steps
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });
    const content = await page.content();
    const has3Steps = content.includes('Choose Template') && content.includes('Fill Details') && content.includes('Get Prompt');
    if (has3Steps) {
      console.log('✓ 3-step wizard verified');
      passed++;
    } else {
      console.log('✗ 3-step wizard not found');
      failed++;
    }
  } catch (e) {
    console.log('✗ Playground:', e.message);
    failed++;
  }

  // Test 4: Demo button and functionality
  try {
    const content = await page.content();
    if (content.includes('Try Demo Instantly')) {
      console.log('✓ Demo button found');
      passed++;

      // Click demo
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const demoBtn = buttons.find(b => b.textContent?.includes('Try Demo'));
        if (demoBtn) demoBtn.click();
      });
      await new Promise(r => setTimeout(r, 1500));

      const afterContent = await page.content();
      if (afterContent.includes('Copy Prompt') && afterContent.includes('Your Prompt is Ready')) {
        console.log('✓ Demo works - navigates to result');
        passed++;
      } else {
        console.log('✗ Demo navigation failed');
        failed++;
      }
    } else {
      console.log('✗ Demo button not found');
      failed += 2;
    }
  } catch (e) {
    console.log('✗ Demo:', e.message);
    failed += 2;
  }

  // Test 5: Theme toggle
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const themeBtn = buttons.find(b => b.title?.includes('Switch to'));
      if (themeBtn) themeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    const htmlClass = await page.$eval('html', el => el.className);
    if (htmlClass.includes('dark')) {
      console.log('✓ Theme toggle works');
      passed++;
    } else {
      console.log('✗ Theme toggle failed');
      failed++;
    }
  } catch (e) {
    console.log('✗ Theme:', e.message);
    failed++;
  }

  await browser.close();

  console.log(`\n========== PRODUCTION TEST ==========`);
  console.log(`Passed: ${passed}/${passed + failed}`);
  console.log(`Site: ${SITE_URL}`);
  console.log(`======================================\n`);

  return failed === 0;
}

test()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
