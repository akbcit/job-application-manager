import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CandidateDetails } from '../clientModels/candidateDetails.model';
import { useQuery ,UseQueryResult} from '@tanstack/react-query';
import { getProfile } from '../network/serverAPICalls/candidate.getProfile';
import { useAuth } from '../globalStates/authState';


interface CandidateDetailsContextType {
    candidateDetails: CandidateDetails;
    setCandidateDetails: React.Dispatch<React.SetStateAction<CandidateDetails>>;
    profileQuery:UseQueryResult,
}

const CandidateDetailsContext = createContext<CandidateDetailsContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCandidateDetails = () => {
    const context = useContext(CandidateDetailsContext);
    if (!context) {
        throw new Error('useCandidateDetails must be used within a CandidateDetailsProvider');
    }
    return context;
};

interface CandidateDetailsProviderProps {
    children: ReactNode;
}

const initialCandidateDetails: CandidateDetails = {
    jobSearch: false,
    candidateName: '',
    candidateEmail: '',
};

export const CandidateDetailsProvider = ({ children }: CandidateDetailsProviderProps) => {
    const [candidateDetails, setCandidateDetails] = useState<CandidateDetails>(initialCandidateDetails);

    const {user} = useAuth();

    const profileQuery = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(user?.email as string),
    });

    useEffect(()=>{
        if(profileQuery.data){
            setCandidateDetails(profileQuery.data.candidateDetails);
        }
    },[profileQuery.data])

    return (
        <CandidateDetailsContext.Provider value={{ candidateDetails, setCandidateDetails,profileQuery }}>
            {children}
        </CandidateDetailsContext.Provider>
    );
};
