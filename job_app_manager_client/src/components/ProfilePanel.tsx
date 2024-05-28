import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../globalStates/authState";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "./ErrorAlert";
import "../styles/ProfilePanel.scss";
import placeHolderProfile from "../assets/placeholderProfile.png";
import { useEffect, useState } from "react";
import { calculateProfileCompletion } from "../utils/calculateProfileCompletion";
import ProfileCompletion from "./ProfileCompletion";
import InfoIcon from '@mui/icons-material/Info';
import { OvalButton } from "./OvalButton";
import { JobSearchModeSwitch } from "./JobSearchModeSwitch";
import { GenericBackDrop } from "./GenericBackDrop";
import { ResumeEditor } from "./ResumeEditor";
import { getResumeVersions } from "../network/serverAPICalls/resume.getResumeVersions";
import { useResumeEditor } from "../localStates/resumeEditorState";
import { JobQueriesEditor } from "./JobQueriesEditor";
import { useJobQueryEditorState } from "../localStates/jobQueryEditorState";
import { JobQueryEditorState } from "../localStates/jobQueryEditorState";
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import { useGmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import { GmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import { GmailAlertsEditor } from "./GmailAlertsEditor";

export const ProfilePanel = () => {
    const { user } = useAuth();
    const [profileCompletion, setProfileCompletion] = useState<number>(0);
    const { resumeEditorOpen, setResumeEditorOpen, setResumeVersionNames } = useResumeEditor();
    const { jobQueryEditorState, setJobQueryEditorState } = useJobQueryEditorState();
    const { gmailAlertsEditorState, setGmailAlertsEditorState } = useGmailAlertsEditorState();

    const { candidateDetails, profileQuery } = useCandidateDetails();

    useEffect(() => {
        setProfileCompletion(calculateProfileCompletion(candidateDetails));
        console.log(candidateDetails)
    }, [candidateDetails]);


    const closeResumeEditor = () => {
        if (resumeEditorOpen) {
            setResumeEditorOpen(false);
        }
    }

    const openJobQueryManager = () => {
        setJobQueryEditorState((prevState: JobQueryEditorState) => ({ ...prevState, isJobQueryEditorOpen: true }));
    }

    const openGmailAlertsEditor = () => {
        setGmailAlertsEditorState((prevState: GmailAlertsEditorState) => ({ ...prevState, isGmailAlertsEditorOpen: true }));
    }

    const closeSearchQueryEditor = () => {
        if (jobQueryEditorState.isJobQueryEditorOpen) {
            setJobQueryEditorState((prevState: JobQueryEditorState) => ({ ...prevState, isJobQueryEditorOpen: false }));
        }
    }

    const closeGmailAlertsEditor = () => {
        if (gmailAlertsEditorState.isGmailAlertsEditorOpen) {
            setGmailAlertsEditorState((prevState: GmailAlertsEditorState) => ({ ...prevState, isGmailAlertsEditorOpen: false }));
        }
    }

    const resumeVersionsQuery = useQuery({
        queryKey: ['getResumeVersions'],
        queryFn: () => getResumeVersions(user?.email as string),
    });

    useEffect(() => {
        if (resumeVersionsQuery.data) {
            setResumeVersionNames(resumeVersionsQuery.data);
        }
    }, [resumeVersionsQuery.data, setResumeVersionNames]);


    if (profileQuery.error) {
        return <ErrorAlert message="Error fetching user details" />;
    }

    const resumeBtnClick = () => {
        if (!resumeEditorOpen) {
            setResumeEditorOpen(true);
        }
    };


    return (
        <>
            <Paper elevation={3} id="profile-panel">
                <div id="avatar-name">
                    <Avatar id="avatar-pic">
                        <img src={user?.pictureUrl ? user.pictureUrl : placeHolderProfile} alt="User Avatar" style={{ width: '100%', height: '100%' }} />
                    </Avatar>
                    <Box id="candidate-name">
                        {`${user?.firstName} ${user?.lastName ? user?.lastName : ""}`}
                    </Box>
                </div>

                <div id="profile-section-2" className="profile-section">
                    <Stack direction="row" alignItems="center" justifyContent="flex-start">
                        <Typography variant="body1" sx={{ ml: 1 }} color="#15d196">
                            Profile Score
                        </Typography>
                        <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        <ProfileCompletion value={profileCompletion} />
                    </Stack>
                    <OvalButton isDisabled={!resumeVersionsQuery.data} onButtonClick={resumeBtnClick} content="Resume Manager" extraClass={!resumeVersionsQuery.data ? "disabled" : ""} />
                    <Typography variant="body1" color="#15d196" className="score-sibling">
                        Location
                    </Typography>
                    <Typography variant="body1" color="#15d196" className="score-sibling">
                        Skills
                    </Typography>
                </div>
                <div id="profile-section-3" className="profile-section">
                    <JobSearchModeSwitch />
                    <Box id="job-applied-profile-container" className={`profile-labels-with-tooltip ${!candidateDetails.jobSearch ? "disabled" : ""}`}>
                        <Typography variant="body1" className="profile-job-search-texts">
                            Jobs Applied
                        </Typography>
                        <Tooltip title="Start Job Search To Activate">
                            <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        </Tooltip>
                    </Box>
                    <Box id="active-job-processes-profile-container" className={`profile-labels-with-tooltip ${!candidateDetails.jobSearch ? "disabled" : ""}`}>
                        <Typography variant="body1">
                            Active Processes
                        </Typography>
                        <Tooltip title="Start Job Search To Activate">
                            <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        </Tooltip>
                    </Box>
                    <OvalButton isDisabled={!candidateDetails.jobSearch} onButtonClick={openGmailAlertsEditor} content="Gmail Alerts Setup" extraClass={!candidateDetails.jobSearch ? "disabled" : ""} />
                    <OvalButton isDisabled={!candidateDetails.jobSearch} onButtonClick={openJobQueryManager} content="Job Query Manager" extraClass={!candidateDetails.jobSearch ? "disabled" : ""} />
                </div>
            </Paper>
            <GenericBackDrop open={resumeEditorOpen} handleClose={closeResumeEditor}>
                <ResumeEditor />
            </GenericBackDrop>

            <GenericBackDrop open={jobQueryEditorState.isJobQueryEditorOpen} handleClose={closeSearchQueryEditor}>
                <JobQueriesEditor onQueriesSave={() => { }} />
            </GenericBackDrop>

            <GenericBackDrop open={gmailAlertsEditorState.isGmailAlertsEditorOpen} handleClose={closeGmailAlertsEditor}>
                <GmailAlertsEditor />
            </GenericBackDrop>
        </>
    );
};
