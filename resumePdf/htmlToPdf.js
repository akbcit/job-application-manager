import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function convertResumeSectionToPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Corrected path to the HTML file
  await page.goto(`file://${__dirname}/../index.html`, {
    waitUntil: "networkidle0",
  });

  // Hide all elements except for the resume section
  await page.evaluate(() => {
    const resume = document.querySelector(".resume").outerHTML;
    document.body.innerHTML = resume;
  });

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  // Adjusting the PDF options
  const pdf = await page.pdf({
    path: `${__dirname}/AK-resume-${year}-${month}-${day}.pdf`,
    format: "A4",
    printBackground: true,
    scale: 1,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "20mm",
      right: "20mm",
    },
  });

  await browser.close();
  console.log("PDF of the resume section generated successfully!");
  return pdf;
}

convertResumeSectionToPDF();
