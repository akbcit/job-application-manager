import { ProfilePanel } from "../components/ProfilePanel.tsx";
import { ResumeEditorProvider } from "../localStates/resumeEditorState.tsx";
import { JobQueryEditorProvider } from "../localStates/jobQueryEditorState.tsx";
import { CandidateDetailsProvider } from "../localStates/candidateDetailsState.tsx";

export const PageDashBoard = () => {
  return (
    <div className="page-dashboard page">
      <CandidateDetailsProvider>
        <ResumeEditorProvider>
          <JobQueryEditorProvider>
            <ProfilePanel />
          </JobQueryEditorProvider>
        </ResumeEditorProvider>
      </CandidateDetailsProvider>
    </div>
  );
};

