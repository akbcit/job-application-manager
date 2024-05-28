import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import "../styles/JobSearchResults.scss";
import { Paper } from '@mui/material';
import { searchedJobs } from "../network/serverAPICalls/candidate.searchedJobs";
import { useQuery } from '@tanstack/react-query';
import { useCandidateDetails } from '../localStates/candidateDetailsState';
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorAlert } from './ErrorAlert';
import { SearchedJob } from '../clientModels/searchedJob.model';

export const JobSearchResults = () => {
    const { candidateDetails } = useCandidateDetails();

    const searchedJobQuery = useQuery({
        queryKey: ["getSearchedJobsForCandidate", candidateDetails?.candidateEmail],
        queryFn: () => searchedJobs(candidateDetails.candidateEmail),
        enabled: !!candidateDetails,
    });

    if (searchedJobQuery.isLoading) {
        return <Paper id="job-search-results-container" elevation={3}><LinearProgress /> </Paper>
    }

    if (searchedJobQuery.error) {
        return <Paper id="job-search-results-container" elevation={3}><LinearProgress />
            <ErrorAlert message='Error loading searched jobs' />
        </Paper>
    }



    const columns: GridColDef[] = [
        { field: "job_title", headerName: "Job Title", width: 250, resizable: true },
        { field: "job_location", headerName: "Location", width: 150, resizable: true },
        { field: "job_company", headerName: "Company", width: 150, resizable: true },
        { field: "job_source", headerName: "Source", width: 150, resizable: true },
    ];

    if (searchedJobQuery.data) {
        console.log(searchedJobQuery.data);
        const rows: GridRowsProp = searchedJobQuery.data.map((job: SearchedJob) => ({
            id: job._id,
            job_title: job.job_title,
            job_location: `${job.job_city}${job.job_country ? `, ${job.job_country}` : ""}`,
            job_company: job.employer_name,
            job_source: job.search_source,
        }));

        return (
            <Paper id="job-search-results-container" elevation={3}>
                <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 12, 20, 50]}
                    className="job-search-results-grid"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                />
            </Paper>
        );
    }
};