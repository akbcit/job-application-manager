import axiosInstance from "../axiosInstance";

export const getJobQueries = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/candidate/jobSearch/query/${email}`);
        if (response.data) {
            console.log(response)
            return response.data.jobQueries;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log("hi");
        throw new Error(`Failed to end job search`);
    }

}