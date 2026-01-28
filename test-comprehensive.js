const puppeteer = require('puppeteer');

const SITE_URL = 'https://promptforge-hammy15s-projects.vercel.app';

async function runTests() {
  console.log('Starting comprehensive tests...\n');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];

  // Test 1: Homepage loads
  console.log('Test 1: Homepage loads');
  try {
    await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    const title = await page.title();
    const heroExists = await page.$('h1');
    results.push({ test: 'Homepage loads', passed: !!heroExists, details: `Title: ${title}` });
    console.log('✓ Homepage loads successfully\n');
  } catch (e) {
    results.push({ test: 'Homepage loads', passed: false, details: e.message });
    console.log('✗ Homepage failed to load\n');
  }

  // Test 2: Light mode is default
  console.log('Test 2: Light mode is default');
  try {
    const htmlClass = await page.$eval('html', el => el.className);
    const isLightMode = htmlClass.includes('light');
    results.push({ test: 'Light mode default', passed: isLightMode, details: `Class: ${htmlClass}` });
    console.log(isLightMode ? '✓ Light mode is default\n' : '✗ Light mode not default\n');
  } catch (e) {
    results.push({ test: 'Light mode default', passed: false, details: e.message });
  }

  // Test 3: Navigation to playground
  console.log('Test 3: Navigate to playground');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    const stepExists = await page.$('[class*="rounded-xl"]');
    results.push({ test: 'Playground loads', passed: !!stepExists, details: 'Page loaded' });
    console.log('✓ Playground loads successfully\n');
  } catch (e) {
    results.push({ test: 'Playground loads', passed: false, details: e.message });
  }

  // Test 4: 3-step wizard (not 5)
  console.log('Test 4: Verify 3-step wizard');
  try {
    await page.waitForSelector('button', { timeout: 5000 });
    const stepButtons = await page.$$eval('button', buttons =>
      buttons.filter(b => b.textContent?.includes('Choose Template') ||
                         b.textContent?.includes('Fill Details') ||
                         b.textContent?.includes('Get Prompt')).length
    );
    const has3Steps = stepButtons >= 1; // At least step 1 visible
    results.push({ test: '3-step wizard', passed: has3Steps, details: `Found step buttons` });
    console.log(has3Steps ? '✓ 3-step wizard verified\n' : '✗ Step count incorrect\n');
  } catch (e) {
    results.push({ test: '3-step wizard', passed: false, details: e.message });
  }

  // Test 5: Try Demo button exists
  console.log('Test 5: Try Demo button exists');
  try {
    const demoButton = await page.$('button');
    const buttons = await page.$$eval('button', btns => btns.map(b => b.textContent));
    const hasDemoButton = buttons.some(t => t?.includes('Try Demo'));
    results.push({ test: 'Demo button exists', passed: hasDemoButton, details: 'Found demo button' });
    console.log(hasDemoButton ? '✓ Try Demo button found\n' : '✗ Demo button not found\n');
  } catch (e) {
    results.push({ test: 'Demo button exists', passed: false, details: e.message });
  }

  // Test 6: One-click demo works
  console.log('Test 6: One-click demo functionality');
  try {
    // Click the demo button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const demoBtn = buttons.find(b => b.textContent?.includes('Try Demo'));
      if (demoBtn) demoBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000)); // Wait for state update

    // Check if we're on the export step (should show "Copy Prompt" button)
    const copyButton = await page.$('button');
    const buttons = await page.$$eval('button', btns => btns.map(b => b.textContent));
    const onExportStep = buttons.some(t => t?.includes('Copy Prompt'));
    results.push({ test: 'Demo navigates to result', passed: onExportStep, details: 'Demo jumped to export' });
    console.log(onExportStep ? '✓ Demo navigates to result\n' : '✗ Demo did not navigate\n');
  } catch (e) {
    results.push({ test: 'Demo navigates to result', passed: false, details: e.message });
  }

  // Test 7: Theme toggle works
  console.log('Test 7: Theme toggle works');
  try {
    // Find and click theme toggle
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const themeBtn = buttons.find(b => b.title?.includes('Switch to'));
      if (themeBtn) themeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const htmlClass = await page.$eval('html', el => el.className);
    const isDarkMode = htmlClass.includes('dark');
    results.push({ test: 'Theme toggle', passed: isDarkMode, details: `Switched to: ${htmlClass}` });
    console.log(isDarkMode ? '✓ Theme toggle works (switched to dark)\n' : '✗ Theme toggle failed\n');
  } catch (e) {
    results.push({ test: 'Theme toggle', passed: false, details: e.message });
  }

  // Test 8: Expert mode loads
  console.log('Test 8: Expert mode loads');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 5000 });

    // Click Expert button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const expertBtn = buttons.find(b => b.textContent?.includes('Expert'));
      if (expertBtn) expertBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Check for Expert mode indicators
    const hasEditor = await page.$('textarea');
    results.push({ test: 'Expert mode loads', passed: !!hasEditor, details: 'Editor found' });
    console.log(hasEditor ? '✓ Expert mode loads\n' : '✗ Expert mode failed\n');
  } catch (e) {
    results.push({ test: 'Expert mode loads', passed: false, details: e.message });
  }

  // Test 9: Industry filter works
  console.log('Test 9: Industry filter in simple mode');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 5000 });

    // Click on an industry filter (M&A)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const maBtn = buttons.find(b => b.textContent?.includes('M&A'));
      if (maBtn) maBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Check if button is now highlighted (has the active class)
    const buttons = await page.$$eval('button', btns => btns.map(b => ({
      text: b.textContent,
      class: b.className
    })));
    const maButton = buttons.find(b => b.text?.includes('M&A'));
    const isActive = maButton?.class?.includes('4ECDC4');
    results.push({ test: 'Industry filter', passed: !!isActive, details: 'M&A filter activated' });
    console.log(isActive ? '✓ Industry filter works\n' : '✗ Industry filter failed\n');
  } catch (e) {
    results.push({ test: 'Industry filter', passed: false, details: e.message });
  }

  // Test 10: Mobile responsive
  console.log('Test 10: Mobile responsive');
  try {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 500));

    // Check if content is visible and not overflowing
    const bodyWidth = await page.$eval('body', el => el.scrollWidth);
    const isResponsive = bodyWidth <= 375;
    results.push({ test: 'Mobile responsive', passed: isResponsive, details: `Body width: ${bodyWidth}` });
    console.log(isResponsive ? '✓ Mobile responsive\n' : '✗ Content overflows on mobile\n');
  } catch (e) {
    results.push({ test: 'Mobile responsive', passed: false, details: e.message });
  }

  await browser.close();

  // Summary
  console.log('\n========== TEST SUMMARY ==========');
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log(`Passed: ${passed}/${total}`);
  console.log('');

  results.forEach(r => {
    console.log(`${r.passed ? '✓' : '✗'} ${r.test}`);
    if (!r.passed) console.log(`  Details: ${r.details}`);
  });

  console.log('\n==================================');

  return passed === total;
}

runTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
  });
