export interface AuthService {
    login: () => void;
    logout: () => void;
    getToken: () => unknown;
}