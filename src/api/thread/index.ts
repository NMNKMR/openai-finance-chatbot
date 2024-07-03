import { axiosInstance } from ".."

export const createThread = async()=> {
    const response = await axiosInstance.post("/threads/thread")
    
    return response.data.data
}