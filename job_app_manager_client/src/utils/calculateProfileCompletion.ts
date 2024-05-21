import { CandidateVM } from "../../../data/db/tsModels/CandidateVM";

export const calculateProfileCompletion = (candidateDetails: CandidateVM | null) => {
    if (candidateDetails === null) {
        return 0;
    }
    return 1;
}
