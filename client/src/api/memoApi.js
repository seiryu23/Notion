const { default: axiosClient } = require("./axiosClient");

const memoApi = {
    create: () => axiosClient.post("memo"),
    getAll: () => axiosClient.get("memo"),
};

export default memoApi;