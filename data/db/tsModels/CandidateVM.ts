import mongoose from "mongoose";
import { ResumeVM } from "./ResumeVM";

export interface CandidateVM {
    candidateName: string;
    candidateEmail: string;
    candidateCity?: string;
    candidateCountry?: string;
    candidatePhone?: string;
    jobSearchIds?: Array<String>;
    resumes:Array<ResumeVM>
}
