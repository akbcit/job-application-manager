import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/ResumeEditor.scss';
import { PersonalInfo } from '../clientModels/personalInfo.model';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ResumeVersionName } from './ResumeVersionName';

const steps = ['Resume Version Name', 'Personal Information', 'Job Experience', 'Education', 'Projects'];

const initialPersonalInfo: PersonalInfo = {
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateLocation: '',
    candidateCountry: '',
};

export const ResumeEditor = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
    const [resumeVersionName, setResumeVersionName] = useState<string>('');

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? steps.findIndex((_step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setPersonalInfo(initialPersonalInfo);
    };

    const handleSaveAndExit = () => {
        // Implement save and exit functionality here
        console.log('Save and Exit');
    };

    const handleResumeNameChange = (newName: string) => {
        setResumeVersionName(newName);
    };

    const handlePersonalInfoChange = (newPersonalInfo: PersonalInfo) => {
        setPersonalInfo(newPersonalInfo);
    };

    const stepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ResumeVersionName defaultValue={resumeVersionName} onVersionNameChange={handleResumeNameChange} />;
            case 1:
                return <PersonalInfoForm defaultValue={personalInfo} onPersonalInfoChange={handlePersonalInfoChange} />;
            case 2:
                return <div>Job Experience Form Component</div>;
            case 3:
                return <div>Education Form Component</div>;
            case 4:
                return <div>Projects Form Component</div>;
            default:
                return null;
        }
    };

    return (
        <Box className="resume-editor">
            <Stepper nonLinear activeStep={activeStep} className="MuiStepper-root">
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
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
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                    </Button>
                                ))}
                            <Button onClick={handleSaveAndExit} sx={{ ml: 1 }}>
                                Save & Exit
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
};
