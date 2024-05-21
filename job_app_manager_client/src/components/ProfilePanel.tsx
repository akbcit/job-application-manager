import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../globalStates/authState";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../network/serverAPICalls/profile.getProfile";
import { ErrorAlert } from "./ErrorAlert";
import "../styles/ProfilePanel.scss";
import placeHolderProfile from "../assets/placeholderProfile.png";
import { useEffect, useState } from "react";
import { CandidateVM } from "../../../data/db/tsModels/CandidateVM";
import { calculateProfileCompletion } from "../utils/calculateProfileCompletion";
import ProfileCompletion from "./ProfileCompletion";
import InfoIcon from '@mui/icons-material/Info';
import { OvalButtonGreen } from "./OvalButtonGreen";

export const ProfilePanel = () => {

    const { user } = useAuth();
    const [profileCompletion, setProfileCompletion] = useState<number>(0);
    const [candidateDetails, setCandidateDetails] = useState<CandidateVM | null>(null);

    const profileQuery = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(user?.email as string),
    });

    useEffect(() => {
        if (profileQuery.data && profileQuery.data.candidateDetails) {
            setCandidateDetails(profileQuery.data.candidateDetails);
            const completion = calculateProfileCompletion(profileQuery.data.candidateDetails);
            setProfileCompletion(completion);
        }
    }, [profileQuery.data]);

    if (profileQuery.error) {
        return (
            <ErrorAlert message="Error fetching user details" />
        );
    }

    const resumeBtnClick = () => {
        // Button click handler logic
    };

    return (
        <Paper elevation={3} id="profile-panel">

            <Stack id="avatar-name" direction="column" spacing={1} alignItems="center" justifyContent="center">
                <Avatar id="avatar-pic">
                    <img src={user?.pictureUrl ? user.pictureUrl : placeHolderProfile} alt="User Avatar" style={{ width: '100%', height: '100%' }} />
                </Avatar>
                <Box id="candidate-name">
                    {`${user?.firstName} ${user?.lastName ? user?.lastName : ""}`}
                </Box>
            </Stack>

            <div id="profile-section-2">
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                    <Typography variant="body1" sx={{ ml: 1 }} component="div" color="#15d196">
                        Profile Score
                    </Typography>
                    <Tooltip title="Add Resume to increase score">
                        <InfoIcon sx={{ color: "#15d196" }} />
                    </Tooltip>
                    <ProfileCompletion value={profileCompletion} />
                </Stack>
                <OvalButtonGreen onButtonClick={resumeBtnClick} content="Add Resume"/>
                <Typography variant="body1" color="#15d196" className="score-sibling">
                    Location:
                </Typography>
                <Typography variant="body1" color="#15d196" className="score-sibling">
                    Skills:
                </Typography>
            </div>
            <Stack id="profile-section-3" direction="column" spacing={1} alignItems="center">
            </Stack>
        </Paper>
    );
};
