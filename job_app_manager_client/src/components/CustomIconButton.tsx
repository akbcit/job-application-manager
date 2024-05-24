import React, { ReactNode, useState } from 'react';
import IconButton from '@mui/material/IconButton';

interface CustomIconButtonProps {
    iconColor?: string;
    iconSize?: string | number;
    icon: ReactNode;
    backgroundColor?: string;
    onClick: () => void;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
    iconColor = 'white',
    iconSize = 'medium',
    icon,
    backgroundColor = 'green',
    onClick
}) => {
    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = () => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);
        onClick();
    };

    return (
        <IconButton
            className="custom-icon-button"
            sx={{
                color: iconColor,
                backgroundColor,
                '&:hover': {
                    backgroundColor: `dark${backgroundColor}`
                },
                transform: isActive ? 'scale(0.9)' : 'none',
                transition: 'transform 0.3s ease',
                padding: '1px',
            }}
            size="small"
            onClick={handleButtonClick}
        >
            {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: iconSize } })}
        </IconButton>
    );
};

export default CustomIconButton;
