import axios from "axios";
import { clearAuthenticated } from "../features/authSLice";

const setUpAxiosInterceptors = (dispatch) => {
    axios.interceptors.request.use((config) => {
        config.withCredentials = true; // This line is added
        return config;
    })

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                dispatch(clearAuthenticated());
            }
            return Promise.reject(error);
        }
    )
}

export default setUpAxiosInterceptors;