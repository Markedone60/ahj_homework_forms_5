import puppeteer from 'puppeteer';

const { fork } = require('child_process');

jest.setTimeout(30000);

describe('Form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Popover открывается', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn');
    button.click();
    await page.waitForSelector('#popover');
    const popoverTitle = await page.$eval('#popover', (e) => e.textContent);
    expect(popoverTitle).toBe('Popover title');
  });

  test('Popover закрывается', async () => {
    const button = await page.$('.btn');
    await button.click();
    await page.waitForSelector('#popover');
    const popover = await page.$eval('#popover', (e) => e.classList.contains('hide'));
    expect(popover).toBe(true);
  });
});