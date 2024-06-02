import puppeteer from "puppeteer";

export const extractLinks = async (emails,senderEmail,candidateId) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    const allLinks = [];
  
    for (const email of emails) {
    
      await page.setContent(email.messageContent, { waitUntil: 'load' });
      const dateFromTimeStamp = new Date(parseInt(email.internalDate));
      const yearFromTimeStamp = dateFromTimeStamp.getFullYear();
      const monthFromTimeStamp = dateFromTimeStamp.getMonth() + 1;
      const dayFromTimeStamp = dateFromTimeStamp.getDate();
      const dateString = `${yearFromTimeStamp}-${monthFromTimeStamp}-${dayFromTimeStamp}`;
      let links = await page.evaluate((dateString, candidateId, senderEmail) => {
        return Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
      });

      links = links.map((link)=>({link:link,sender:senderEmail,candidateId:candidateId,emailDate:dateString}))
      allLinks.push(...links);
    }
  
    await browser.close();
    return allLinks;
  };