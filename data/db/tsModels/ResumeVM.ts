// Job Experience Interface
export interface IJobExperience {
  company: string;
  title: string;
  startDate: string;  
  endDate: string;
  description: string[];
}

// Project Interface
export interface IProject {
  name: string;
  description: string[];
  skillsShowcased: string[];
}

// Education Interface
export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  achievements?: string[];  
}

// Resume Interface
export interface ResumeVM {
  candidateEmail: string;
  candidateSkills: string[];
  candidateHeadline?: string;
  jobExperiences?: IJobExperience[];
  projects?: IProject[];
  education?: IEducation[];
  languages?: string[];
  lastUpdated:Date,
  versionName:string,
}
