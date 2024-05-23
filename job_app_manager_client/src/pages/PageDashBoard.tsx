import { ProfilePanel } from "../components/ProfilePanel.tsx";
import { ResumeEditorProvider } from "../localStates/resumeEditorState.tsx";

export const PageDashBoard = () => {
  return (
    <div className="page-dashboard page">
      <ResumeEditorProvider>
        <ProfilePanel />
      </ResumeEditorProvider>
    </div>
  );
};

