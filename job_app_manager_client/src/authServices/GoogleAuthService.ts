import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { AuthService } from '../clientModels/authService.model';
import { useAuth } from '../globalStates/authState';
import axios from 'axios';

export const useGoogleAuth = (): AuthService => {
    const { handleLogin, handleLogout } = useAuth();

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                // Exchange authorization code for tokens
                const response = await axios.post("/api/auth/google", codeResponse);
                const loginResponse = response.data;
                handleLogin(loginResponse, "google");
            } catch (error) {
                console.error('Failed to exchange authorization code for tokens', error);
            }
        },
        onError: () => {
            console.log("Login error");
            handleLogout();
        },
        scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify',
    });

    const logout = () => {
        googleLogout();
        handleLogout();
    };

    return {
        login,
        logout
    };
};
