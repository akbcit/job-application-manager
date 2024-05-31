import { Paper } from "@mui/material"
import { EmailFromInput } from "./EmailFromInput";
import { useGmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import { useEffect, useState } from "react";
import { OvalButton } from "./OvalButton";
import { addGmailAlert } from "../network/serverAPICalls/jobAlerts.scanInbox";
import { MailScanRangeSelect } from "./MailScanRangeSelect";
import "../styles/GmailAlertsEditor.scss";
import { useCandidateDetails } from "../localStates/candidateDetailsState";

export const GmailAlertsEditor = () => {
    const { candidateDetails } = useCandidateDetails();

    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    const { gmailAlertsEditorState } = useGmailAlertsEditorState();

    useEffect(() => {
        if (gmailAlertsEditorState.emailFrom && gmailAlertsEditorState.emailScanRange) {
            setIsSubmitDisabled(false);
        }
        else {
            setIsSubmitDisabled(true);
        }

    }, [gmailAlertsEditorState.emailFrom,gmailAlertsEditorState.emailScanRange]);

    const handleSubmit = async ()=>{
        console.log(gmailAlertsEditorState.emailFrom);
        const email = candidateDetails.candidateEmail;
        await addGmailAlert(email,gmailAlertsEditorState.emailFrom,gmailAlertsEditorState.emailScanRange);
    }

    return <>
        <Paper elevation={3} id="gmail-alerts-editor-container">
            <EmailFromInput />
            <MailScanRangeSelect/>
            <OvalButton primaryColor="#0047ab" isDisabled={isSubmitDisabled} onButtonClick={handleSubmit} content="Add Alert" extraClass={isSubmitDisabled ? "disabled" : ""} />
        </Paper>
    </>
}