import React, { useState, useEffect } from 'react';
import { Box, FormControl, TextField } from '@mui/material';

interface ResumeVersionNameProps {
    defaultValue?: string;
    onVersionNameChange: (versionName: string) => void;
}

export const ResumeVersionName: React.FC<ResumeVersionNameProps> = ({ defaultValue = '', onVersionNameChange }) => {
    const [versionName, setVersionName] = useState<string>(defaultValue);

    useEffect(() => {
        if (defaultValue) {
            setVersionName(defaultValue);
        }
    }, [defaultValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setVersionName(newName);
        onVersionNameChange(newName);
    };

    return (
        <Box className="resume-version-name">
            <FormControl>
                <TextField
                    id="resumeVersionName"
                    label="Resume Version Name"
                    value={versionName}
                    onChange={handleInputChange}
                    helperText="Enter a unique name for this resume version"
                    required
                />
            </FormControl>
        </Box>
    );
};

export default ResumeVersionName;
