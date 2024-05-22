import { Education } from "./education.model";
import { JobExperience } from "./jobExperience.model";
import { PersonalInfo } from "./personalInfo.model";
import { Project } from "./project.mode";


export interface Resume{
    personalInfo:PersonalInfo,
    education:Array<Education>,
    jobExperiences:Array<JobExperience>,
    projects:Array<Project>,
    candidateHeadline:string,
    languages:Array<string>,
    candidateSkills:Array<string>,
}
