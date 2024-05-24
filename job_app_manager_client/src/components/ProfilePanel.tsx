import { Box, Button, Paper, Stack, Tooltip, Typography } from "@mui/material";
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
import { JobSearchModeSwitch } from "./JobSearchModeSwitch";
import { GenericBackDrop } from "./GenericBackDrop";
import { ResumeEditor } from "./ResumeEditor";
import { getResumeVersions } from "../network/serverAPICalls/resume.getResumeVersions";
import { useResumeEditor } from "../localStates/resumeEditorState";
import { JobQueriesEditor } from "./JobQueriesEditor";

export const ProfilePanel = () => {

    const { user } = useAuth();
    const [profileCompletion, setProfileCompletion] = useState<number>(0);
    const [candidateDetails, setCandidateDetails] = useState<CandidateVM | null>(null);
    const [jobSearchMode, setJobSearchMode] = useState<boolean>(false);
    const [resumeEditorOpen, setResumeEditorOpen] = useState<boolean>(false);
    const {setResumeVersionNames} = useResumeEditor();
    const [searchQueryEditorOpen,setSearchQueryEditorOpen] = useState<boolean>(false);

    const closeResumeEditor = () => {
        if (resumeEditorOpen) {
            setResumeEditorOpen(false);
        }
    }

    const closeSearchQueryEditor = () => {
        if (searchQueryEditorOpen) {
            setSearchQueryEditorOpen(false);
        }
    }


    const resumeVersionsQuery = useQuery(
        {
            queryKey: ['getResumeVersions'],
            queryFn: () => getResumeVersions(user?.email as string),
        }
    )

    useEffect(()=>{
        if(resumeVersionsQuery.data){
            setResumeVersionNames(resumeVersionsQuery.data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resumeVersionsQuery.data])

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
        if (!resumeEditorOpen) {
            setResumeEditorOpen(true);
        }
    };

    const onJobSearchModeToggle = (newToggledState: boolean) => {
        setJobSearchMode(newToggledState);
    }

    const openJobQueryManager  = ()=>{
        setSearchQueryEditorOpen(true);
    }

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
                    <OvalButtonGreen isDisabled={!resumeVersionsQuery.data} onButtonClick={resumeBtnClick} content="Resume Manager" extraClass={!resumeVersionsQuery.data?"disabled":""}/>
                    <Typography variant="body1" color="#15d196" className="score-sibling">
                        Location
                    </Typography>
                    <Typography variant="body1" color="#15d196" className="score-sibling">
                        Skills
                    </Typography>
                </div>
                <div id="profile-section-3" className="profile-section">
                    <JobSearchModeSwitch onToggle={onJobSearchModeToggle} defaultValue={jobSearchMode} switchLabel={`${!jobSearchMode ? "Start Job Search" : "End Job Search"}`} />
                    <Box id="job-applied-profile-container" className={`profile-labels-with-tooltip ${!jobSearchMode ? "disabled" : ""}`}>
                        <Typography variant="body1" className="profile-job-search-texts">
                            Jobs Applied
                        </Typography>
                        <Tooltip title="Start Job Search To Activate">
                            <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        </Tooltip>
                    </Box>
                    <Box id="active-job-processes-profile-container" className={`profile-labels-with-tooltip ${!jobSearchMode ? "disabled" : ""}`}>
                        <Typography variant="body1">
                            Active Processes
                        </Typography>
                        <Tooltip title="Start Job Search To Activate">
                            <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        </Tooltip>
                    </Box>
                    <Box id="links-in-tray-profile-container" className={`profile-labels-with-tooltip ${!jobSearchMode ? "disabled" : ""}`}>
                        <Typography variant="body1">
                            Links in Tray
                        </Typography>
                        <Tooltip title="Start Job Search To Activate">
                            <InfoIcon sx={{ color: "#15d196", marginLeft: 0.1, marginRight: 0.5, fontSize: 16 }} />
                        </Tooltip>
                    </Box>
                    <OvalButtonGreen isDisabled={!jobSearchMode} onButtonClick={openJobQueryManager} content="Job Query Manager" extraClass={!jobSearchMode?"disabled":""}/>
                </div>
            </Paper>
            <GenericBackDrop open={resumeEditorOpen} handleClose={closeResumeEditor}>
                <ResumeEditor />
            </GenericBackDrop>
            <GenericBackDrop open={searchQueryEditorOpen} handleClose={closeSearchQueryEditor}>
                <JobQueriesEditor onQueriesSave={()=>{}}/>
            </GenericBackDrop>
        </>
    );
};
