import axiosInstance from "../axiosInstance";

export const searchedJobs = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/candidate/jobSearch/searchedJobs/${email}`);
        if (response.data.searchedJobs) {
            return response.data.searchedJobs;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log("hi");
        throw new Error(`Failed to get jobs`);
    }

}