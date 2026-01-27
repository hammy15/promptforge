import puppeteer from 'puppeteer';

async function testDashboardWalkthrough() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Clear localStorage but set onboarding as done to skip to walkthrough
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
    localStorage.setItem('promptforge-onboarded', 'true');
  });

  console.log('Navigating to dashboard...');
  await page.goto('https://code-examples-five.vercel.app/', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for splash screen to finish and walkthrough to appear
  console.log('Waiting for splash screen and walkthrough...');
  await new Promise(r => setTimeout(r, 5000));

  // Check if walkthrough appeared
  const initialCheck = await page.evaluate(() => {
    return {
      hasWelcome: document.body.innerText.includes('Welcome to PromptForge'),
      hasStepIndicator: document.body.innerText.includes('Step 1 of'),
      pageTitle: document.title
    };
  });

  console.log('Page title:', initialCheck.pageTitle);
  console.log('Walkthrough appeared:', initialCheck.hasWelcome || initialCheck.hasStepIndicator);

  // Take screenshot
  await page.screenshot({ path: 'dashboard-step1.png' });
  console.log('\nStep 1 screenshot saved');

  // Click through all steps
  let stepCount = 1;
  while (stepCount < 15) { // Safety limit
    const stepInfo = await page.evaluate(() => {
      const stepIndicator = document.body.innerText.match(/Step (\d+) of (\d+)/);
      const titles = Array.from(document.querySelectorAll('h3'));
      let title = '';
      for (const t of titles) {
        const text = t.innerText;
        if (text && !text.includes('Step') && text.length > 3 && text.length < 60) {
          title = text;
          break;
        }
      }
      return {
        step: stepIndicator ? stepIndicator[1] : null,
        total: stepIndicator ? stepIndicator[2] : null,
        title
      };
    });

    if (stepInfo.step) {
      console.log('Step ' + stepInfo.step + '/' + stepInfo.total + ': ' + stepInfo.title);
    }

    // Try to click Next or final button
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => {
        const text = b.innerText;
        return text.includes('Next') ||
               text.includes('Get Started') ||
               text.includes('Ready to Build');
      });
      if (btn) {
        btn.click();
        return btn.innerText.trim();
      }
      return null;
    });

    if (!clicked) {
      console.log('No more steps - tour ended');
      break;
    }

    stepCount++;
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'dashboard-step' + stepCount + '.png' });

    if (clicked.includes('Get Started') || clicked.includes('Ready to Build')) {
      console.log('Clicked final button - tour complete');
      break;
    }
  }

  // Wait for tour to close
  await new Promise(r => setTimeout(r, 500));

  // Check for Help button
  const helpButton = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const helpBtn = buttons.find(b => b.innerText.includes('Help'));
    return helpBtn ? { found: true, text: helpBtn.innerText } : { found: false };
  });

  console.log('\nHelp button after tour:', helpButton);

  // Take final screenshot
  await page.screenshot({ path: 'dashboard-complete.png', fullPage: true });
  console.log('Final screenshot saved');

  // Test Help button re-triggers tour
  if (helpButton.found) {
    console.log('\nClicking Help button...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const helpBtn = buttons.find(b => b.innerText.includes('Help'));
      if (helpBtn) helpBtn.click();
    });

    await new Promise(r => setTimeout(r, 800));

    const tourRestarted = await page.evaluate(() => {
      return document.body.innerText.includes('Step') &&
             document.body.innerText.includes('of');
    });

    console.log('Tour re-triggered:', tourRestarted);
    await page.screenshot({ path: 'dashboard-tour-restarted.png' });
  }

  await browser.close();
  console.log('\n✅ Dashboard walkthrough test complete!');
}

testDashboardWalkthrough().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
