import "../styles/NavMenu.scss";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../authServices/GoogleAuthService";
import { useAuth } from "../globalStates/authState";

const NavMenu = () => {

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const { login, logout } = useGoogleAuth();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Button id="nav-menu-btn" aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                Menu
            </Button>
            <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    navigate("/");
                    handleClose();
                }}>Home</MenuItem>
                {!isAuthenticated && <MenuItem onClick={() => login()}>Login with Google</MenuItem>}
                {isAuthenticated && <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>}
                {isAuthenticated && <MenuItem onClick={() => logout()}>Logout</MenuItem>}
            </Menu>
        </>
    )
}

export default NavMenu;