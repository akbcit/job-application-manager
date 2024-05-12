import { convertResumeSectionToPDF } from "../htmlToPdf.js";
import fs from "fs";
import path from "path";

export const getResumePDF = async ()=>{
    const pdf = await convertResumeSectionToPDF();
    return pdf;
}