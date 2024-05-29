import axiosInstance from "../axiosInstance"

export const addGmailAlert = async (emailFrom: string,scanRange:string) => {
    try {
        const response = await axiosInstance.get(`/jobAlerts/gmailParse/${emailFrom}/${scanRange}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to add scan alert`);
    }

}