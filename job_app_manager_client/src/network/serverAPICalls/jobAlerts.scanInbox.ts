import axiosInstance from "../axiosInstance"

export const scanInbox = async (email:string,emailFrom: string,scanRange:string) => {
    try {
        const response = await axiosInstance.post(`/jobAlerts/gmailParse/${email}/${emailFrom}/${scanRange}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to add scan alert`);
    }
}