import { ProfilePanel } from "../components/ProfilePanel.tsx";
import { ResumeEditorProvider } from "../localStates/resumeEditorState.tsx";
import { JobQueryEditorProvider } from "../localStates/jobQueryEditorState.tsx";

export const PageDashBoard = () => {
  return (
    <div className="page-dashboard page">
      <ResumeEditorProvider>
        <JobQueryEditorProvider>
          <ProfilePanel />
        </JobQueryEditorProvider>
      </ResumeEditorProvider>
    </div>
  );
};

