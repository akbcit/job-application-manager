import { Box, Paper, Stack, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../globalStates/authState";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../network/serverAPICalls/profile.getProfile";
import { ErrorAlert } from "./ErrorAltert";
import "../styles/ProfilePanel.scss";
import placeHolderProfile from "../assets/placeholderProfile.png";
import { useEffect, useState } from "react";
import { CandidateVM } from "../../../data/db/tsModels/CandidateVM";
import { calculateProfileCompletion } from "../utils/calculateProfileCompletion";
import ProfileCompletion from "./ProfileCompletion";

export const ProfilePanel = () => {

    const { user } = useAuth();
    const [profileCompletion, setProfilCompletion] = useState<number>(0);
    const [candidateDetails, setCandidateDetails] = useState<CandidateVM | null>(null);

    const profileQuery = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(user?.email as string),
    })

    useEffect(() => {
        setCandidateDetails(profileQuery.data);
        const completion = calculateProfileCompletion(profileQuery.data);
        setProfilCompletion(completion);
    }, [profileQuery.data])



    if (profileQuery.error) {
        return (
            <ErrorAlert message="Error fetching user details" />
        )
    }

    console.log(user);
    return (
        <Paper elevation={3} id="profile-panel">
            <Box id="profile-section-1">
                <Stack id="avatar-name" direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Avatar id="avatar-pic">
                        <img src={user?.pictureUrl ? user.pictureUrl : placeHolderProfile} alt="User Avatar" style={{ width: '100%', height: '100%' }} />
                    </Avatar>
                    <Box id="candidate-name">
                        {`${user?.firstName} ${user?.lastName ? user?.lastName : ""}`}
                    </Box>
                </Stack>
            </Box>
            <Stack id="profile-section-2" direction="column" spacing={1} alignItems="center">
                <ProfileCompletion value={profileCompletion} />
            </Stack>
            <Stack id="profile-section-3" direction="column" spacing={1} alignItems="center">
            </Stack>
        </Paper>
    );
}
