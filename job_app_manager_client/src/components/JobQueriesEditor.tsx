/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Paper } from "@mui/material";
import { JobQuery } from "../clientModels/jobQuery.model";
import { CitySelect } from "./CitySelect";
import { City } from "../clientModels/city.model";
import { useEffect, useState } from "react";
import { JobTitleInput } from "./JobTitleInput";
import "../styles/JobQueriesEditor.scss";
import { OvalButton } from "./OvalButton";
import { useJobQueryEditorState } from "../localStates/jobQueryEditorState";

interface JobQueriesEditorProps {
    onQueriesSave: (jobQueries: Array<JobQuery>) => void;
}

export const JobQueriesEditor: React.FC<JobQueriesEditorProps> = () => {

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [jobTitle, setJobTitle] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const { jobQueryEditorState,setJobQueryEditorState } = useJobQueryEditorState();

    useEffect(() => {
        if (jobQueryEditorState.selectedCity === null || !jobQueryEditorState.jobTitle) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [jobQueryEditorState.selectedCity, jobQueryEditorState.jobTitle]);

    const handleSubmit = () => {

    }

    return (
        <Paper elevation={3} id="add-queries-container">
            <JobTitleInput/>
            <CitySelect/>
            <OvalButton primaryColor="#0047ab" isDisabled={isSubmitDisabled} onButtonClick={handleSubmit} content="Add Query" extraClass={isSubmitDisabled ? "disabled" : ""} />
        </Paper>
    )
}