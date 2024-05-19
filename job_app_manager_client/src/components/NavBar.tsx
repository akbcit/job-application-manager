import "../styles/NavBar.scss";
import NavMenu from "./NavMenu";
import siteLogo from "../assets/JOBBER.svg";
import { useAuth } from "../globalStates/authState";

const NavBar = () => {

    const { user, isAuthenticated } = useAuth();

    return (
        <div id="site-nav">
            <img src={siteLogo} alt="site-logo" id="nav-logo" />
            <div id="nav-right">
                {isAuthenticated && user && <div>Hi {user?.firstName}!</div>}
                <NavMenu />
            </div>
        </div>
    )
}

export default NavBar;