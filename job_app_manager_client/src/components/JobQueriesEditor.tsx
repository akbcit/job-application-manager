import { Paper } from "@mui/material";
import { JobQuery } from "../clientModels/jobQuery.model";
import { CitySelect } from "./CitySelect";
import { useEffect, useState } from "react";
import { JobTitleInput } from "./JobTitleInput";
import "../styles/JobQueriesEditor.scss";
import { OvalButton } from "./OvalButton";
import { useJobQueryEditorState } from "../localStates/jobQueryEditorState";
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import { addJobQuery } from "../network/serverAPICalls/candidate.addQuery";
import { JobQueriesList } from "./JobQueriesList";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { useQueryClient } from "@tanstack/react-query";

interface JobQueriesEditorProps {
    onQueriesSave: (jobQueries: Array<JobQuery>) => void;
}

export const JobQueriesEditor: React.FC<JobQueriesEditorProps> = () => {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const { jobQueryEditorState } = useJobQueryEditorState();
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const { candidateDetails } = useCandidateDetails();

    const queryClient = useQueryClient();

    queryClient.invalidateQueries({queryKey:["getJobQueriesForCandidate"]})

    useEffect(() => {
        if (jobQueryEditorState.selectedCity === null || !jobQueryEditorState.jobTitle) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [jobQueryEditorState.selectedCity, jobQueryEditorState.jobTitle]);

    const handleSubmit = async () => {
        const jobTitle = jobQueryEditorState.jobTitle;
        const city = jobQueryEditorState.selectedCity?.city_name;
        const country = jobQueryEditorState.selectedCity?.city_country_name;
        const email = candidateDetails.candidateEmail;
        if (email && jobTitle && city && country) {
            await addJobQuery(email, jobTitle, city, country);
            setSnackBarOpen(true);
        }
    }

    const handleSnackBarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBarOpen(false);
    }

    return (
        <>
            <Paper elevation={3} id="add-queries-container">
                <JobTitleInput />
                <CitySelect />
                <OvalButton primaryColor="#0047ab" isDisabled={isSubmitDisabled} onButtonClick={handleSubmit} content="Add Query" extraClass={isSubmitDisabled ? "disabled" : ""} />
                <JobQueriesList />
            </Paper>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={4000}
                onClose={handleSnackBarClose}
                message="Job Search Query Added"
                action={
                    <Button color="inherit" size="small" onClick={handleSnackBarClose}>
                        Close
                    </Button>
                }
            />
        </>
    )
}
