export interface CandidateDetails{
    jobSearch: boolean,
    _id?: string,
    userId?: string,
    candidateName: string,
    candidateEmail: string,
    resumeIds?: Array<string>,
    jobSearchIds?: Array<string>,
  }