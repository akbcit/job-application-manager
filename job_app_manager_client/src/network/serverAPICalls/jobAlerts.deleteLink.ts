import axiosInstance from "../axiosInstance";

export const deleteLinkById = async (email: string,linkId:string) => {
    try {
        const response = await axiosInstance.delete(`/jobAlerts/links/${email}/${linkId}`);
        if (response.data.success) {
            return true;
        }
        else {
            throw new Error(`Failed to delete link`);
        }
    }
    catch (err) {
        throw new Error(`Failed to delete link`);
    }
}