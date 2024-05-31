import puppeteer from "puppeteer";

export const extractLinks = async (emails) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    const allLinks = [];
  
    for (const email of emails) {
      await page.setContent(email.messageContent, { waitUntil: 'load' });
  
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
      });
  
      allLinks.push(...links);
    }
  
    await browser.close();
    return allLinks;
  };