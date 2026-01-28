const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('=== Testing Light Mode & Theme Toggle ===\n');

    // 1. Load Playground
    console.log('1. Loading Playground...');
    await page.goto('https://code-examples-five.vercel.app/playground', { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(1000);
    
    // Skip walkthrough
    await page.evaluate(() => {
      const skipBtn = Array.from(document.querySelectorAll('*')).find(el => 
        (el.textContent === 'Skip tour' || el.textContent === 'Skip') && el.children.length === 0
      );
      if (skipBtn) skipBtn.click();
    });
    await delay(500);
    
    // Check initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('light') ? 'light' : 
             document.documentElement.classList.contains('dark') ? 'dark' : 'none';
    });
    console.log('   Initial theme: ' + initialTheme);
    
    await page.screenshot({ path: '/tmp/theme-initial.png' });
    console.log('   Screenshot: /tmp/theme-initial.png');

    // 2. Test theme toggle
    console.log('\n2. Testing theme toggle...');
    const toggled = await page.evaluate(() => {
      const toggleBtn = document.querySelector('button[title*="Switch to"]');
      if (toggleBtn) {
        toggleBtn.click();
        return true;
      }
      return false;
    });
    
    if (toggled) {
      await delay(500);
      const newTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('light') ? 'light' : 
               document.documentElement.classList.contains('dark') ? 'dark' : 'none';
      });
      console.log('   Theme after toggle: ' + newTheme);
      
      await page.screenshot({ path: '/tmp/theme-toggled.png' });
      console.log('   Screenshot: /tmp/theme-toggled.png');
    } else {
      console.log('   Could not find theme toggle');
    }

    // 3. Test Expert tab
    console.log('\n3. Testing Expert tab...');
    const expertClicked = await page.evaluate(() => {
      const expertBtn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.includes('Expert')
      );
      if (expertBtn) {
        expertBtn.click();
        return true;
      }
      return false;
    });
    
    if (expertClicked) {
      await delay(500);
      const content = await page.content();
      const hasEditor = content.includes('Prompt Editor') || content.includes('Expert');
      const hasTools = content.includes('Variables') || content.includes('Compress');
      console.log('   Expert mode activated: ' + (hasEditor ? '✓' : '✗'));
      console.log('   Tools panel visible: ' + (hasTools ? '✓' : '✗'));
      
      await page.screenshot({ path: '/tmp/expert-mode.png' });
      console.log('   Screenshot: /tmp/expert-mode.png');
    } else {
      console.log('   Could not click Expert button');
    }

    console.log('\n=== Tests Complete ===');

  } catch (error) {
    console.error('Test error:', error.message);
    await page.screenshot({ path: '/tmp/error.png' });
  } finally {
    await browser.close();
  }
})();
