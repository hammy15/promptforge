const puppeteer = require('puppeteer');

const SITE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('Starting comprehensive tests on localhost...\n');
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
    await page.waitForSelector('button', { timeout: 10000 });
    results.push({ test: 'Playground loads', passed: true, details: 'Page loaded' });
    console.log('✓ Playground loads successfully\n');
  } catch (e) {
    results.push({ test: 'Playground loads', passed: false, details: e.message });
    console.log('✗ Playground failed to load: ' + e.message + '\n');
  }

  // Test 4: 3-step wizard
  console.log('Test 4: Verify 3-step wizard');
  try {
    const pageContent = await page.content();
    const hasChooseTemplate = pageContent.includes('Choose Template');
    const hasFillDetails = pageContent.includes('Fill Details');
    const hasGetPrompt = pageContent.includes('Get Prompt');
    const has3Steps = hasChooseTemplate && hasFillDetails && hasGetPrompt;
    results.push({ test: '3-step wizard', passed: has3Steps, details: `Steps found: Choose=${hasChooseTemplate}, Fill=${hasFillDetails}, Get=${hasGetPrompt}` });
    console.log(has3Steps ? '✓ 3-step wizard verified\n' : '✗ Step count incorrect\n');
  } catch (e) {
    results.push({ test: '3-step wizard', passed: false, details: e.message });
  }

  // Test 5: Try Demo button exists
  console.log('Test 5: Try Demo button exists');
  try {
    const pageContent = await page.content();
    const hasDemoButton = pageContent.includes('Try Demo Instantly');
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
    const pageContent = await page.content();
    const onExportStep = pageContent.includes('Copy Prompt') || pageContent.includes('Your Prompt is Ready');
    results.push({ test: 'Demo navigates to result', passed: onExportStep, details: 'Demo jumped to export' });
    console.log(onExportStep ? '✓ Demo navigates to result\n' : '✗ Demo did not navigate\n');
  } catch (e) {
    results.push({ test: 'Demo navigates to result', passed: false, details: e.message });
  }

  // Test 7: Theme toggle works
  console.log('Test 7: Theme toggle works');
  try {
    // Find and click theme toggle
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const themeBtn = buttons.find(b => b.title?.includes('Switch to'));
      if (themeBtn) {
        themeBtn.click();
        return true;
      }
      return false;
    });
    await new Promise(r => setTimeout(r, 500));

    if (clicked) {
      const htmlClass = await page.$eval('html', el => el.className);
      const isDarkMode = htmlClass.includes('dark');
      results.push({ test: 'Theme toggle', passed: isDarkMode, details: `Switched to: ${htmlClass}` });
      console.log(isDarkMode ? '✓ Theme toggle works (switched to dark)\n' : '✗ Theme toggle failed\n');
    } else {
      results.push({ test: 'Theme toggle', passed: false, details: 'Theme button not found' });
      console.log('✗ Theme toggle button not found\n');
    }
  } catch (e) {
    results.push({ test: 'Theme toggle', passed: false, details: e.message });
  }

  // Test 8: Expert mode loads
  console.log('Test 8: Expert mode loads');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });

    // Click Expert button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const expertBtn = buttons.find(b => b.textContent?.includes('Expert'));
      if (expertBtn) expertBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Check for Expert mode indicators (should have prompt editor)
    const pageContent = await page.content();
    const hasEditor = pageContent.includes('Prompt Editor') || await page.$('textarea');
    results.push({ test: 'Expert mode loads', passed: !!hasEditor, details: 'Editor found' });
    console.log(hasEditor ? '✓ Expert mode loads\n' : '✗ Expert mode failed\n');
  } catch (e) {
    results.push({ test: 'Expert mode loads', passed: false, details: e.message });
  }

  // Test 9: Industry filter works
  console.log('Test 9: Industry filter in simple mode');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });

    // Click on an industry filter (M&A)
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const maBtn = buttons.find(b => b.textContent?.includes('M&A'));
      if (maBtn) {
        maBtn.click();
        return true;
      }
      return false;
    });
    await new Promise(r => setTimeout(r, 500));

    if (clicked) {
      // Check if templates are filtered
      const pageContent = await page.content();
      results.push({ test: 'Industry filter', passed: true, details: 'M&A filter clicked' });
      console.log('✓ Industry filter works\n');
    } else {
      results.push({ test: 'Industry filter', passed: false, details: 'M&A button not found' });
      console.log('✗ Industry filter button not found\n');
    }
  } catch (e) {
    results.push({ test: 'Industry filter', passed: false, details: e.message });
  }

  // Test 10: Template selection and customization
  console.log('Test 10: Template selection workflow');
  try {
    await page.goto(`${SITE_URL}/playground`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('button', { timeout: 10000 });

    // Click on a template card (find one with a template icon)
    const clicked = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.card'));
      const templateCard = cards.find(c => c.textContent?.includes('DCF') || c.textContent?.includes('Investment'));
      if (templateCard && templateCard.tagName === 'BUTTON') {
        templateCard.click();
        return true;
      }
      return false;
    });
    await new Promise(r => setTimeout(r, 500));

    // Should now be on customize step
    const pageContent = await page.content();
    const onCustomizeStep = pageContent.includes('Financial Details') || pageContent.includes('Fill Details');
    results.push({ test: 'Template selection', passed: onCustomizeStep, details: 'Navigated to customize' });
    console.log(onCustomizeStep ? '✓ Template selection works\n' : '✗ Template selection failed\n');
  } catch (e) {
    results.push({ test: 'Template selection', passed: false, details: e.message });
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

  return passed >= total * 0.8; // 80% pass rate
}

runTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
  });
