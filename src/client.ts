import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true; // 전역 설정

const client = (token?: string): AxiosInstance | undefined => {
    const ENDPOINT = import.meta.env.VITE_ENDPOINT as string | undefined;

    if (!ENDPOINT) {
        console.error('Endpoint is not exist');
        return undefined;
    }

    const config: AxiosRequestConfig = {
        baseURL: ENDPOINT,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json",
        },
    };

    if (token) {
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${token}`,
        };
    }

    return axios.create(config);
};

export default client;
