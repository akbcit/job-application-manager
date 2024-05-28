import { ProfilePanel } from "../components/ProfilePanel.tsx";
import { ResumeEditorProvider } from "../localStates/resumeEditorState.tsx";
import { JobQueryEditorProvider } from "../localStates/jobQueryEditorState.tsx";
import { CandidateDetailsProvider } from "../localStates/candidateDetailsState.tsx";
import { JobSearchResults } from "../components/JobSearchResults.tsx";
import { GmailAlertsEditorProvider } from "../localStates/gmailAlertsEditorState.tsx";
import "../styles/PageDashBoard.scss";

export const PageDashBoard = () => {
  return (
    <div className="page-dashboard page">
      <CandidateDetailsProvider>
        <ResumeEditorProvider>
          <JobQueryEditorProvider>
            <GmailAlertsEditorProvider>
              <ProfilePanel />
            </GmailAlertsEditorProvider>
            <JobSearchResults />
          </JobQueryEditorProvider>
        </ResumeEditorProvider>
      </CandidateDetailsProvider>
    </div>
  );
};

