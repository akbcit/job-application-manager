import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";

export interface GmailAlertsEditorState {
    isGmailAlertsEditorOpen: boolean;
}

const initialState: GmailAlertsEditorState = {
    isGmailAlertsEditorOpen: false,
};

export const GmailAlertsEditorContext = createContext<{
    gmailAlertsEditorState: GmailAlertsEditorState;
    setGmailAlertsEditorState: React.Dispatch<React.SetStateAction<GmailAlertsEditorState>>;
} | undefined>(undefined);

interface GmailAlertsEditorProviderProps {
    children: ReactNode;
}

export const GmailAlertsEditorProvider: React.FC<GmailAlertsEditorProviderProps> = ({ children }) => {
    const [gmailAlertsEditorState, setGmailAlertsEditorState] = useState<GmailAlertsEditorState>(initialState);

    useEffect(() => {
        if (gmailAlertsEditorState.isGmailAlertsEditorOpen === false) {
            console.log("hi");
            setGmailAlertsEditorState((prevState:GmailAlertsEditorState) => ({
                ...prevState,
            }));
        }
    }, [gmailAlertsEditorState.isGmailAlertsEditorOpen]);

    return (
        <GmailAlertsEditorContext.Provider value={{ gmailAlertsEditorState, setGmailAlertsEditorState }}>
            {children}
        </GmailAlertsEditorContext.Provider>
    );
};

// Custom hook for accessing the context
// eslint-disable-next-line react-refresh/only-export-components
export const useGmailAlertsEditorState = () => {
    const context = useContext(GmailAlertsEditorContext);
    if (context === undefined) {
        throw new Error("useGmailAlertsEditorContext must be used within a GmailAlertsEditorProvider");
    }
    return context;
};
