import { createContext, useContext, useState, ReactNode } from 'react';
import { PersonalInfo } from '../clientModels/personalInfo.model';
import { Socials } from '../clientModels/socials.model';


export interface ResumeEditorState {
    activeStep: number;
    completed: { [k: number]: boolean };
    personalInfo: PersonalInfo;
    socialsInfo: Socials;
    resumeVersionNames: string[];
    currentResumeName: string;
    isNextActive: boolean;
    isBackActive: boolean;
    isSaveActive: boolean;
    setActiveStep: (step: number) => void;
    setCompleted: (completed: { [k: number]: boolean }) => void;
    setPersonalInfo: (info: PersonalInfo) => void;
    setSocialsInfo: (info: Socials) => void;
    setResumeVersionNames: (names: string[]) => void;
    setCurrentResumeName: (name: string) => void;
    setIsNextActive: (isActive: boolean) => void;
    setIsBackActive: (isActive: boolean) => void;
    setIsSaveActive: (isActive: boolean) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleComplete: () => void;
    handleReset: () => void;
    handleSaveAndExit: () => void;
}

const initialPersonalInfo: PersonalInfo = {
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateLocation: '',
    candidateCountry: '',
};

const initialSocialsInfo: Socials = {
    candidateLinkedInUrl: '',
    candidateGitHubUrl: '',
    candidatePersonalUrl: '',
};

const ResumeEditorContext = createContext<ResumeEditorState | undefined>(undefined);

export const ResumeEditorProvider = ({ children }: { children: ReactNode }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
    const [socialsInfo, setSocialsInfo] = useState<Socials>(initialSocialsInfo);
    const [resumeVersionNames, setResumeVersionNames] = useState<string[]>([]);
    const [currentResumeName, setCurrentResumeName] = useState<string>('');
    const [isNextActive, setIsNextActive] = useState(true);
    const [isBackActive, setIsBackActive] = useState(false);
    const [isSaveActive, setIsSaveActive] = useState(true);

    const steps = ['Resume Version Name', 'Personal Information', 'Job Experience', 'Education', 'Projects', 'Socials'];

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? steps.findIndex((_step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
        setIsBackActive(newActiveStep !== 0);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            const newStep = prevActiveStep - 1;
            setIsBackActive(newStep !== 0);
            return newStep;
        });
    };

    const handleComplete = () => {
        const newCompleted = { ...completed, [activeStep]: true };
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setPersonalInfo(initialPersonalInfo);
        setSocialsInfo(initialSocialsInfo);
        setResumeVersionNames([]);
        setCurrentResumeName('');
    };

    const handleSaveAndExit = () => {
        console.log('Save and Exit');
    };

    return (
        <ResumeEditorContext.Provider value={{
            activeStep,
            completed,
            personalInfo,
            socialsInfo,
            resumeVersionNames,
            currentResumeName,
            isNextActive,
            isBackActive,
            isSaveActive,
            setActiveStep,
            setCompleted,
            setPersonalInfo,
            setSocialsInfo,
            setResumeVersionNames,
            setCurrentResumeName,
            setIsNextActive,
            setIsBackActive,
            setIsSaveActive,
            handleNext,
            handleBack,
            handleComplete,
            handleReset,
            handleSaveAndExit,
        }}>
            {children}
        </ResumeEditorContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResumeEditor = () => {
    const context = useContext(ResumeEditorContext);
    if (!context) {
        throw new Error('useResumeEditor must be used within a ResumeEditorProvider');
    }
    return context;
};