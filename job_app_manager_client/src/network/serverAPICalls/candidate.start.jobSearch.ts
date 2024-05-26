import axiosInstance from "../axiosInstance";

export const startJobSearch = async (email: string) => {
    try {
        const response = await axiosInstance.post(`/candidate/jobSearch/start/${email}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to start job search`);
    }
}