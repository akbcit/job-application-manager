import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function convertResumeSectionToPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const filePath = `file://${__dirname}/../index.html`;
    console.log(`Navigating to file: ${filePath}`);

    // Corrected path to the HTML file with increased timeout
    await page.goto(filePath, {
      waitUntil: "domcontentloaded", // Changed to 'domcontentloaded'
      timeout: 60000, // Increased timeout to 60 seconds
    });

    console.log("Page loaded successfully");

    // Hide all elements except for the resume section
    await page.evaluate(() => {
      const resume = document.querySelector(".resume").outerHTML;
      document.body.innerHTML = resume;
    });

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');

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
  } catch (error) {
    console.error("An error occurred while generating the PDF:", error);
    await browser.close();
  }
}

convertResumeSectionToPDF();
