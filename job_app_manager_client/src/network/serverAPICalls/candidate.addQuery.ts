import { JobQuery } from "../../clientModels/jobQuery.model";
import axiosInstance from "../axiosInstance";

export const addJobQuery = async (email: string, jobTitle: string, city: string, country: string) => {
    try {
        const jobQuery: JobQuery = {
            jobTitle: jobTitle,
            city: city,
            country: country,
        }
        const response = await axiosInstance.post(`/candidate/jobSearch/query/${email}`, jobQuery);
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