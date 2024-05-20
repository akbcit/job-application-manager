import axiosInstance from "../axiosInstance";

export const getProfile = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/profile/${email}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to fetch profile: ${(error as Error).message}`);
    }
}