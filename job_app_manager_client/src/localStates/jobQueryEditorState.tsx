import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { City } from "../clientModels/city.model";

export interface JobQueryEditorState {
    isJobQueryEditorOpen: boolean;
    selectedCity: City | null;
    jobTitle: string;
}

const initialState: JobQueryEditorState = {
    isJobQueryEditorOpen: false,
    selectedCity: null,
    jobTitle: "",
};

export const JobQueryEditorContext = createContext<{
    jobQueryEditorState: JobQueryEditorState;
    setJobQueryEditorState: React.Dispatch<React.SetStateAction<JobQueryEditorState>>;
} | undefined>(undefined);

interface JobQueryEditorProviderProps {
    children: ReactNode;
}

export const JobQueryEditorProvider: React.FC<JobQueryEditorProviderProps> = ({ children }) => {
    const [jobQueryEditorState, setJobQueryEditorState] = useState<JobQueryEditorState>(initialState);

    useEffect(() => {
        if (jobQueryEditorState.isJobQueryEditorOpen === false) {
            console.log("hi");
            setJobQueryEditorState((prevState) => ({
                ...prevState,
                selectedCity: null,
                jobTitle: "",
            }));
        }
    }, [jobQueryEditorState.isJobQueryEditorOpen]);

    return (
        <JobQueryEditorContext.Provider value={{ jobQueryEditorState, setJobQueryEditorState }}>
            {children}
        </JobQueryEditorContext.Provider>
    );
};

// Custom hook for accessing the context
// eslint-disable-next-line react-refresh/only-export-components
export const useJobQueryEditorState = () => {
    const context = useContext(JobQueryEditorContext);
    if (context === undefined) {
        throw new Error("useJobQueryEditor must be used within a JobQueryEditorProvider");
    }
    return context;
};
