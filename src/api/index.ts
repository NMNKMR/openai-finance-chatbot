import Axios from "axios"

export const axiosInstance = Axios.create({baseURL: import.meta.env.VITE_BASE_URI})