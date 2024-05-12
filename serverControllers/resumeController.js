import { getResumePDF } from "../resumePdf/utils/getResumePDF.js";

export const getResume = async (req, res) => {
    try {
        console.log("Starting PDF generation...");
        const resumePdfBuffer = await getResumePDF();
        console.log("PDF generation completed.");
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
        console.log("Sending PDF...");
        res.send(resumePdfBuffer);
    } catch (error) {
        console.error("Failed to get PDF: ", error);
        res.status(500).send({ error: "Failed to download PDF." });
    }
}
