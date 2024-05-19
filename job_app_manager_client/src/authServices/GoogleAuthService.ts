import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { TokenResponse } from '../clientModels/tokenResponse.model';
import { AuthService } from '../clientModels/authService.model';
import { useAuth } from '../globalStates/authState';


export const useGoogleAuth = (): AuthService => {
    const { handleLogin, handleLogout } = useAuth();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            handleLogin(tokenResponse, "google");
        },
        onError: () => {
            console.log("hi")
            handleLogout();
        },
    });

    const logout = () => {
        googleLogout();
        handleLogout();
    };

    const getToken = (): TokenResponse | null => {
        const token = localStorage.getItem('googleToken');
        return token ? JSON.parse(token) : null;
    };

    return {
        login,
        logout,
        getToken,
    };
};
