import { axiosInstance } from ".."

export const addNewMessage = async({threadId, message}: {threadId: string | null, message: string})=> {
    const response = await axiosInstance.post("/messages/message", {threadId, message})

    return response.data.data
}