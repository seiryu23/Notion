import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

// API実行する前に前処理を行う
axiosClient.interceptors.request.use(
    async(config) => {
        return {
            ...config,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${getToken()}`, // リクエストヘッダにJWTを付与してサーバに渡す
            },
        };
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (err) => {
        throw err.response;
    }
);

export default axiosClient;