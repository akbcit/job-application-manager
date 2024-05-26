import axiosInstance from "../axiosInstance";

export const endJobSearch = async (email: string) => {
    try {
        const response = await axiosInstance.post(`/candidate/jobSearch/end/${email}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to end job search`);
    }
}