const puppeteer = require('puppeteer');

const SITE_URL = 'http://localhost:3000';

async function test() {
  console.log('Running quick verification...\n');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let passed = 0;
  let failed = 0;

  // Test 1: Homepage
  try {
    await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('h1', { timeout: 10000 });
    const h1Text = await page.$eval('h1', el => el.textContent);
    console.log('✓ Homepage loaded:', h1Text.substring(0, 50));
    passed++;
  } catch (e) {
    console.log('✗ Homepage:', e.message);
    failed++;
  }

  // Test 2: Light mode
  try {
    const htmlClass = await page.$eval('html', el => el.className);
    if (htmlClass.includes('light')) {
      console.log('✓ Light mode is default');
      passed++;
    } else {
      console.log('✗ Light mode not default, class:', htmlClass);
      failed++;
    }
  } catch (e) {
    console.log('✗ Light mode check:', e.message);
    failed++;
  }

  // Test 3: Playground loads with 3-step wizard
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });

    const content = await page.content();
    const has3Steps = content.includes('Choose Template') &&
                      content.includes('Fill Details') &&
                      content.includes('Get Prompt');
    if (has3Steps) {
      console.log('✓ 3-step wizard verified');
      passed++;
    } else {
      console.log('✗ 3-step wizard not found');
      console.log('  Looking for: Choose Template, Fill Details, Get Prompt');
      failed++;
    }
  } catch (e) {
    console.log('✗ Playground:', e.message);
    failed++;
  }

  // Test 4: Try Demo button
  try {
    const content = await page.content();
    if (content.includes('Try Demo Instantly')) {
      console.log('✓ Try Demo button found');
      passed++;
    } else {
      console.log('✗ Try Demo button not found');
      failed++;
    }
  } catch (e) {
    console.log('✗ Demo button:', e.message);
    failed++;
  }

  // Test 5: Demo click works
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const demoBtn = buttons.find(b => b.textContent?.includes('Try Demo'));
      if (demoBtn) demoBtn.click();
    });
    await new Promise(r => setTimeout(r, 1500));

    const content = await page.content();
    if (content.includes('Copy Prompt') && content.includes('Your Prompt is Ready')) {
      console.log('✓ Demo navigates to result page');
      passed++;
    } else {
      console.log('✗ Demo did not navigate properly');
      failed++;
    }
  } catch (e) {
    console.log('✗ Demo click:', e.message);
    failed++;
  }

  // Test 6: Theme toggle
  try {
    // Click theme toggle
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const themeBtn = buttons.find(b => b.title?.includes('Switch to'));
      if (themeBtn) themeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const htmlClass = await page.$eval('html', el => el.className);
    if (htmlClass.includes('dark')) {
      console.log('✓ Theme toggle works (switched to dark)');
      passed++;
    } else {
      console.log('✗ Theme toggle failed, class:', htmlClass);
      failed++;
    }
  } catch (e) {
    console.log('✗ Theme toggle:', e.message);
    failed++;
  }

  // Test 7: Expert mode
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const expertBtn = buttons.find(b => b.textContent?.includes('Expert'));
      if (expertBtn) expertBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const content = await page.content();
    if (content.includes('Prompt Editor') || content.includes('Tools')) {
      console.log('✓ Expert mode loads');
      passed++;
    } else {
      console.log('✗ Expert mode failed');
      failed++;
    }
  } catch (e) {
    console.log('✗ Expert mode:', e.message);
    failed++;
  }

  await browser.close();

  console.log(`\n========== RESULTS ==========`);
  console.log(`Passed: ${passed}/${passed + failed}`);
  console.log(`=============================\n`);

  return failed === 0;
}

test()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
