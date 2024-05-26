import { CandidateDetails } from "../clientModels/candidateDetails.model";

export const calculateProfileCompletion = (candidateDetails: CandidateDetails | null) => {
    if (candidateDetails === null) {
        return 0;
    }
    return 1;
}
