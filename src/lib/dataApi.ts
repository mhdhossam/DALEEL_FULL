/**
 * Axios instance for the /data/* prefix (admin course/enrollment/payment views).
 * Shares the same auth interceptors as the main api instance.
 */
import axios from "axios";
import { addAuthHeader, makeResponseInterceptor } from "./api";

const dataApi = axios.create({
    baseURL: "/data",
    headers: { "Content-Type": "application/json" },
});

dataApi.interceptors.request.use(addAuthHeader);
dataApi.interceptors.response.use((r) => r, makeResponseInterceptor(dataApi));

export default dataApi;
