import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import "../styles/JobSearchResults.scss";
import { Paper } from '@mui/material';

export const JobSearchResults = () => {

    const columns: GridColDef[] = [
        { field: "job_title", headerName: "Job Title", width: 150 },
        { field: "job_city", headerName: "City", width: 150 },
        { field: "job_country", headerName: "Country", width: 150 },
        { field: "job_company", headerName: "Company", width: 150 },
        { field: "source", headerName: "Source", width: 150 },
    ];

    const rows: GridRowsProp = [
        { id: 1, job_title: "Software Engineer", job_city: "San Francisco", job_country: "USA", job_company: "Tech Corp", source: "LinkedIn" },
        { id: 2, job_title: "Product Manager", job_city: "New York", job_country: "USA", job_company: "Innovate LLC", source: "Indeed" },
        { id: 3, job_title: "Data Scientist", job_city: "Toronto", job_country: "Canada", job_company: "DataWorks", source: "Glassdoor" },
        { id: 4, job_title: "UI/UX Designer", job_city: "Vancouver", job_country: "Canada", job_company: "DesignHub", source: "Monster" },
        { id: 5, job_title: "DevOps Engineer", job_city: "Austin", job_country: "USA", job_company: "CloudNet", source: "Company Website" },
    ];

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
                }} />
        </Paper>
    );
};