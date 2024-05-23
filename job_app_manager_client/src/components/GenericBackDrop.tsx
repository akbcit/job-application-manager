import React from 'react';
import { Backdrop, Box } from '@mui/material';
import "../styles/GenericBackDrop.scss"

interface GenericBackDropProps {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

export const GenericBackDrop: React.FC<GenericBackDropProps> = ({ open, handleClose, children }) => {

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };


    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <Box display="flex" flexDirection="column" alignItems="center" onClick={handleClick}>
                {children}
            </Box>
        </Backdrop>
    );
};

