import axiosInstance from "../axiosInstance";

export const deleteAllLinks = async (email: string) => {
    try {
        const response = await axiosInstance.delete(`/jobAlerts/links/${email}`);
        if (response.data.success) {
            return true;
        }
        else {
            throw new Error(`Failed to delete links`);
        }
    }
    catch (err) {
        throw new Error(`Failed to delete links`);
    }
}