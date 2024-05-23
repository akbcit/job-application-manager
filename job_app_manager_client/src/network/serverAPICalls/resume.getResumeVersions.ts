import axiosInstance from "../axiosInstance";

export const getResumeVersions = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/resume/version-names/${email}`);
        if (response.data && response.data.resumeVersions) {
            return response.data.resumeVersions;
        }
        else {
            throw new Error("No versions found!");
        }
    }
    catch (err) {
        throw new Error("Some error while fetching resume versions");
    }
}