import axiosInstance from "../AxiosConfig";

export const UploadImage = async (formData) => {
    try {
        const response = await axiosInstance.post("/measure", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
