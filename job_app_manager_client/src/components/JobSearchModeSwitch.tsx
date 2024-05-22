import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../styles/JobSearchModeSwitch.scss";

interface JobSearchModeSwitchProps {
    defaultValue: boolean;
    onToggle: (newToggleState: boolean) => void;
    switchLabel: string;
}

export const JobSearchModeSwitch: React.FC<JobSearchModeSwitchProps> = ({ defaultValue, onToggle, switchLabel }) => {
    const [checked, setChecked] = React.useState(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onToggle(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} className="custom-switch" />}
            label={switchLabel}
            className="custom-label"
        />
    );
}
