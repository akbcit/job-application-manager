import axiosInstance from "../axiosInstance";

export const getScannedLinksForCandidate = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/jobAlerts/links/${email}`);
        if (response.data.links) {
            return response.data.links;
        }
        else {
            throw new Error(`Failed to get links`);
        }
    }
    catch (err) {
        throw new Error(`Failed to get links`);
    }
}