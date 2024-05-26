import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../styles/JobSearchModeSwitch.scss";
import { startJobSearch } from '../network/serverAPICalls/candidate.start.jobSearch';
import { endJobSearch } from '../network/serverAPICalls/candidate.end.jobSearch';
import { useAuth } from '../globalStates/authState';
import { useCandidateDetails } from '../localStates/candidateDetailsState';

export const JobSearchModeSwitch: React.FC = () => {
    const { user } = useAuth();
    const { candidateDetails, setCandidateDetails } = useCandidateDetails();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = event.target.checked;
        if (newState && user) {
            await startJobSearch(user.email);
        } else if (!newState && user) {
            await endJobSearch(user.email);
        }
        // Update the local state after the API call
        setCandidateDetails(prevDetails => ({
            ...prevDetails,
            jobSearch: newState,
        }));
    };

    return (
        <FormControlLabel
            control={<Switch checked={candidateDetails.jobSearch} onChange={handleChange} className="custom-switch" />}
            label={`${!candidateDetails.jobSearch ? "Start Job Search" : "End Job Search"}`}
            className="custom-label"
        />
    );
};
