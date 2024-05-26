import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import { getJobQueries } from "../network/serverAPICalls/candidate.getJobQueries";
import { ErrorAlert } from "./ErrorAlert";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/JobQueriesList.scss";
import { deleteJobQuery } from "../network/serverAPICalls/candidate.deleteQuery";
import { JobQuery } from "../clientModels/jobQuery.model";
import CircularProgress from "@mui/material/CircularProgress";

export const JobQueriesList= () => {
    const { candidateDetails } = useCandidateDetails();
    const [deleteProgressQueries, setDeleteProgressQueries] = useState<string[]>([]);

    const jobQueriesQuery = useQuery({
        queryKey: ["getJobQueriesForCandidate"],
        queryFn: () => getJobQueries(candidateDetails.candidateEmail)
    });

    if (jobQueriesQuery.isLoading) {
        return (
            <div className="queries-list-container">
                <LinearProgress />
            </div>
        );
    }

    if (jobQueriesQuery.error) {
        return (
            <div className="queries-grid-container">
                <ErrorAlert message="Error fetching candidate's queries" />
            </div>
        );
    }

    const handleQueryDelete = async (jobQuery: JobQuery) => {
        const queryId = jobQuery._id as string;
        if (!queryId) return;

        setDeleteProgressQueries((prev) => [...prev, queryId]);
        try {
            await deleteJobQuery(candidateDetails.candidateEmail, queryId);
            jobQueriesQuery.refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Failed to delete job query", error);
        } finally {
            setDeleteProgressQueries((prev) => prev.filter((id) => id !== queryId));
        }
    }

    if (candidateDetails && jobQueriesQuery.data) {
        return (
            <div className="queries-list-container">
                {jobQueriesQuery.data.map((jobQuery: JobQuery, index: number) => (
                    <div key={index} className="job-query-item">
                        <span>{`${jobQuery.jobTitle} in ${jobQuery.city}, ${jobQuery.country}`}</span>
                        <div className="icon-container">
                            {deleteProgressQueries.includes(jobQuery?._id as string) ? (
                                <CircularProgress style={{ color: 'green' }} />
                            ) : (
                                <IconButton aria-label="delete" onClick={() => handleQueryDelete(jobQuery)}>
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};
