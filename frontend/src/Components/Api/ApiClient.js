import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8898'
    }
);

export default apiClient