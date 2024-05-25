import React from "react";
import "../styles/JobTitleInput.scss";
import { useJobQueryEditorState } from '../localStates/jobQueryEditorState';

export const JobTitleInput: React.FC = () => {
    const { jobQueryEditorState, setJobQueryEditorState } = useJobQueryEditorState();

    const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setJobQueryEditorState((prevState) => ({
            ...prevState,
            jobTitle: newTitle,
        }));
    };

    return (
        <div className="job-title-input-container">
            <label htmlFor="job-title-input">Job Title</label>
            <input
                placeholder="Add a job title"
                value={jobQueryEditorState.jobTitle || ""}
                id="job-title-input"
                name="job-title"
                type="text"
                onChange={handleJobTitleChange}
            />
        </div>
    );
};
