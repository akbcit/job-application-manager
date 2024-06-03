import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getScannedLinksForCandidate } from '../network/serverAPICalls/jobAlerts.getScannedLinks';
import { deleteLinkById } from '../network/serverAPICalls/jobAlerts.deleteLink';
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import { ErrorAlert } from "./ErrorAlert";
import { LinearProgress, Paper, Link, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/ScannedLinksList.scss";
import { ScannedLink } from '../clientModels/scannedLink.model';
import { useState } from 'react';
import { deleteAllLinks } from '../network/serverAPICalls/jobAlerts.deleteAllLinks';

export const ScannedLinksList = () => {

    const [deleteInProgress, setDeleteInProgress] = useState<string[]>([]);

    const { candidateDetails } = useCandidateDetails();
    const queryClient = useQueryClient();

    const scannedLinksQuery = useQuery({
        queryKey: ["getScannedLinksForCandidate"],
        queryFn: () => getScannedLinksForCandidate(candidateDetails.candidateEmail)
    });

    const handleDelete = async (id: string) => {
        setDeleteInProgress((prevState) => [...prevState, id]);
        try {
            await deleteLinkById(candidateDetails.candidateEmail, id);
            queryClient.invalidateQueries({ queryKey: ["getScannedLinksForCandidate"] })
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setDeleteInProgress((prevState) => prevState.filter((item) => item !== id));
        }
    };

    const handleDeleteAll = async () => {
        try {
            await deleteAllLinks(candidateDetails.candidateEmail);
            queryClient.invalidateQueries({ queryKey: ["getScannedLinksForCandidate"] });
        }
        catch (err) {
            console.log(err);

        }
    }

    if (scannedLinksQuery.isLoading) {
        return (
            <div className="links-list-container">
                <LinearProgress />
            </div>
        );
    }

    if (scannedLinksQuery.error) {
        return (
            <div className="links-list-container">
                <ErrorAlert message="Error fetching candidate's job links" />
            </div>
        );
    }

    if (scannedLinksQuery.data) {

        const rows: GridRowsProp = scannedLinksQuery.data.map((link: ScannedLink) => ({
            id: link._id,
            emailDate: link.emailDate,
            sender: link.sender,
            link: link.link,
        }));

        const columns: GridColDef[] = [
            { field: "emailDate", headerName: "Email Date", width: 250 },
            { field: "sender", headerName: "Source", width: 250 },
            {
                field: "link",
                headerName: "Link",
                flex: 1,
                renderCell: (params) => (
                    <Link href={params.value} target="_blank" rel="noopener noreferrer">
                        Click to go to Job Link
                    </Link>
                ),
            },
            {
                field: "delete",
                headerName: "Delete",
                width: 100,
                renderCell: (params) => (
                    <IconButton
                        onClick={() => handleDelete(params.id as string)}
                        color="secondary"
                        disabled={deleteInProgress.includes(params.id as string)}
                        className={`delete-link-btn ${deleteInProgress.includes(params.id as string) ? `disabled` : ""}`}
                    >
                        <DeleteIcon />
                    </IconButton>
                ),
            },
        ];

        return (
            <Paper id="links-list-container" elevation={3}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 12, 20, 50]}
                    className="links-list-grid"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                />
                <div className="delete-all-btn-container">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteAll}
                        disabled={deleteInProgress.length > 0}
                    >
                        Delete All
                    </Button>
                </div>
            </Paper>
        );
    }

    return null;
};
