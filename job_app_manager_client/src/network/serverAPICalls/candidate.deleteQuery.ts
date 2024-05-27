import axiosInstance from "../axiosInstance";

export const deleteJobQuery = async (email: string, queryId: string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/jobSearch/query/${email}/${queryId}`);
        if (response.data) {
            return response.data;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw new Error(`Failed to end job search`);
    }
}