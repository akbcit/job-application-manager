import React, { useEffect, useState, useCallback } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { Socials } from '../clientModels/socials.model';
import "../styles/PersonalInfoForm.scss";

interface SocialsFormProps {
    defaultValue?: Socials;
    onSocialsChange: (socialsInfo: Socials) => void;
}

export const SocialsForm: React.FC<SocialsFormProps> = ({ defaultValue, onSocialsChange }) => {

    const [socialsInfo, setSocialsInfo] = useState<Socials>({
        candidateLinkedInUrl: '',
        candidateGitHubUrl: '',
        candidatePersonalUrl: '',
    });

    useEffect(() => {
        if (defaultValue) {
            setSocialsInfo(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        onSocialsChange(socialsInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socialsInfo]);

    const handleInputChange = useCallback((field: keyof Socials) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSocialsInfo(prevInfo => {
            if (prevInfo[field] === newValue) {
                return prevInfo; // No change, do not update state
            }
            return {
                ...prevInfo,
                [field]: newValue,
            };
        });
    }, []);

    return (
        <Box className="form-section">
            <FormControl>
                <TextField
                    id="candidateLinkedin"
                    label="LinkedIn"
                    value={socialsInfo.candidateLinkedInUrl || ''}
                    onChange={handleInputChange('candidateLinkedInUrl')}
                    helperText="Enter your LinkedIn profile URL"
                />
            </FormControl>
            <FormControl>
                <TextField
                    id="candidatePersonalUrl"
                    label="Website"
                    value={socialsInfo.candidatePersonalUrl || ''}
                    onChange={handleInputChange('candidatePersonalUrl')}
                    helperText="Enter your Portfolio Site URL"
                />
            </FormControl>
            <FormControl>
                <TextField
                    id="candidateGitHub"
                    label="GitHub"
                    value={socialsInfo.candidateGitHubUrl || ''}
                    onChange={handleInputChange('candidateGitHubUrl')}
                    helperText="Enter your GitHub profile URL"
                />
            </FormControl>
        </Box>
    );
};
