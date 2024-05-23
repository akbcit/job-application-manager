// ResumeEditor.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/ResumeEditor.scss';
import { useResumeEditor } from '../localStates/resumeEditorState';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ResumeVersionName } from './ResumeVersionName';
import { SocialsForm } from './SocialsForm';

const steps = ['Resume Version Name', 'Personal Information', 'Job Experience', 'Education', 'Projects', 'Socials'];

export const ResumeEditor = () => {
  const {
    activeStep,
    completed,
    resumeVersionName,
    personalInfo,
    socialsInfo,
    isNextActive,
    isBackActive,
    isSaveActive,
    handleNext,
    handleBack,
    handleComplete,
    handleReset,
    handleSaveAndExit,
    setResumeVersionName,
    setPersonalInfo,
    setSocialsInfo
  } = useResumeEditor();

  const allStepsCompleted = () => Object.keys(completed).length === steps.length;

  const stepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ResumeVersionName defaultValue={resumeVersionName} onVersionNameChange={setResumeVersionName} />;
      case 1:
        return <PersonalInfoForm defaultValue={personalInfo} onPersonalInfoChange={setPersonalInfo} />;
      case 2:
        return <div>Job Experience Form Component</div>;
      case 3:
        return <div>Education Form Component</div>;
      case 4:
        return <div>Projects Form Component</div>;
      case 5:
        return <SocialsForm defaultValue={socialsInfo} onSocialsChange={setSocialsInfo}/>;
      default:
        return null;
    }
  };

  const completedSteps = () => Object.keys(completed).length;


  return (
    <Box className="resume-editor">
      <Stepper nonLinear activeStep={activeStep} className="MuiStepper-root">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={() => handleBack()}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box className="content-container">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {stepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={!isBackActive}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                disabled={!isNextActive}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === steps.length - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
              <Button
                disabled={!isSaveActive}
                onClick={handleSaveAndExit}
                sx={{ ml: 1 }}
              >
                Save & Exit
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

