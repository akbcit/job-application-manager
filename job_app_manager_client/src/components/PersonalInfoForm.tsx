import React, { useEffect, useState, useCallback } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { PersonalInfo } from '../clientModels/personalInfo.model';
import "../styles/PersonalInfoForm.scss";

interface PersonalInfoFormProps {
    defaultValue?: PersonalInfo;
    onPersonalInfoChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ defaultValue, onPersonalInfoChange }) => {

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        candidateName: '',
        candidateEmail: '',
        candidatePhone: '',
        candidateLocation: '',
        candidateCountry: '',
    });

    useEffect(() => {
        if (defaultValue) {
            setPersonalInfo(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        onPersonalInfoChange(personalInfo);
    }, [personalInfo, onPersonalInfoChange]);

    const handleInputChange = useCallback((field: keyof PersonalInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setPersonalInfo(prevInfo => {
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
                    id="candidateName"
                    label="Name"
                    value={personalInfo.candidateName}
                    onChange={handleInputChange('candidateName')}
                    helperText="Enter your full name"
                    required
                />
            </FormControl>
            <Box className="personal-info-section">
                <FormControl>
                    <TextField
                        id="candidateEmail"
                        label="Email"
                        value={personalInfo.candidateEmail}
                        onChange={handleInputChange('candidateEmail')}
                        helperText="Enter your email address"
                        required
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        id="candidatePhone"
                        label="Phone"
                        value={personalInfo.candidatePhone || ''}
                        onChange={handleInputChange('candidatePhone')}
                        helperText="Enter your phone number"
                    />
                </FormControl>
            </Box>
            <Box className="personal-info-section">

                <FormControl>
                    <TextField
                        id="candidateLocation"
                        label="Location"
                        value={personalInfo.candidateLocation}
                        onChange={handleInputChange('candidateLocation')}
                        helperText="Enter your current location"
                        required
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        id="candidateCountry"
                        label="Country"
                        value={personalInfo.candidateCountry}
                        onChange={handleInputChange('candidateCountry')}
                        helperText="Enter your country"
                        required
                    />
                </FormControl>
            </Box>
        </Box>
    );
};
