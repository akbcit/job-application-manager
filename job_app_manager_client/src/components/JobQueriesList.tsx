import { useQuery } from "@tanstack/react-query";
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import { getJobQueries } from "../network/serverAPICalls/candidate.getJobQueries";
import { ErrorAlert } from "./ErrorAlert";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/JobQueriesList.scss";

export interface JobQuery {
  jobTitle: string,
  city: string,
  country: string,
  candidateId?: string,
}

export const JobQueriesList = () => {
  const { candidateDetails } = useCandidateDetails();

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
      <div className="queries-list-container">
        <ErrorAlert message="Error fetching candidate's queries" />
      </div>
    );
  }

  if (candidateDetails && jobQueriesQuery.data) {
    return (
      <div className="queries-list-container">
        {jobQueriesQuery.data.map((jobQuery: JobQuery, index: number) => (
          <div key={index} className="job-query-item">
            <span>{`${jobQuery.jobTitle} in ${jobQuery.city}, ${jobQuery.country}`}</span>
            <IconButton aria-label="delete" onClick={() => { /* define your onClick function here */ }}>
              <DeleteIcon sx={{color:"red"}}/>
            </IconButton>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
