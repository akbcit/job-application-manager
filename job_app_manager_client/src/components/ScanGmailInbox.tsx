import { Paper } from "@mui/material"
import { EmailFromInput } from "./EmailFromInput";
import { useGmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import { useEffect, useState } from "react";
import { OvalButton } from "./OvalButton";
import { scanInbox } from "../network/serverAPICalls/jobAlerts.scanInbox";
import { MailScanRangeSelect } from "./MailScanRangeSelect";
import "../styles/GmailAlertsEditor.scss";
import { useCandidateDetails } from "../localStates/candidateDetailsState";
import CircularProgress from '@mui/material/CircularProgress';

export const ScanGmailInbox = () => {
    const { candidateDetails } = useCandidateDetails();
    const [isScanInProgress,setIsScanInProgress] = useState(false);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    const { gmailAlertsEditorState } = useGmailAlertsEditorState();

    useEffect(() => {
        if (gmailAlertsEditorState.emailFrom && gmailAlertsEditorState.emailScanRange &&!isScanInProgress) {
            setIsSubmitDisabled(false);
        }
        else {
            setIsSubmitDisabled(true);
        }

    }, [gmailAlertsEditorState.emailFrom,gmailAlertsEditorState.emailScanRange,isScanInProgress]);

    const handleSubmit = async ()=>{
        console.log(gmailAlertsEditorState.emailFrom);
        const email = candidateDetails.candidateEmail;
        setIsScanInProgress(true);
        await scanInbox(email,gmailAlertsEditorState.emailFrom,gmailAlertsEditorState.emailScanRange);
        setIsScanInProgress(false);
    }

    return <>
        <Paper elevation={3} id="gmail-alerts-editor-container">
            <EmailFromInput />
            <MailScanRangeSelect/>
            <OvalButton primaryColor="#0047ab" isDisabled={isSubmitDisabled} onButtonClick={handleSubmit} content="Add Alert" extraClass={isSubmitDisabled ? "disabled" : ""} />
            {isScanInProgress && <CircularProgress/>}
        </Paper>
    </>
}