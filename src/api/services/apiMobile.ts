import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HOST_NAME, MOBILE_SERVER } from "@env";

//= ==========================================================================================
const apiMobile = axios.create({
    baseURL: `https://${HOST_NAME}:${MOBILE_SERVER}`,
    timeout: 25000,
});

//= ==============================================================================================
// ---- Request Middleware
apiMobile.interceptors.request.use(async request => {
    const savedToken = await AsyncStorage.getItem("TOKEN");
    // const user = await getUser();
    const user = null;
    const token = savedToken || user?.TOKEN;

    if (token) {
        try {
            request.headers["x-access-token"] = token;
            request.data.user = { IDS001: user?.IDS001, DSEMALOG: user?.DSEMALOG };
        } catch (err) {
            console.log("ERROR_TOKEN: ", err);
        }
    }

    return request;
});

//= ==============================================================================================
// ---- Response Middleware
apiMobile.interceptors.response.use(
    async responseSuccess => {
        const newToken = responseSuccess?.headers["x-access-token"];

        if (newToken) AsyncStorage.setItem("TOKEN", newToken);

        return responseSuccess;
    },
    responseError => {
        if (String(responseError).includes("401") || responseError?.status === 401) {
            axios.CancelToken.source().cancel(
                "Cancelling all pending request because an 401 error.",
            );

            // AsyncStorage.removeItem(TOKEN_KEY);

            // store.dispatch(resetDataToLogout());
            // store.dispatch(setLogoutMessage(responseError?.response.data.armensag));
        }
        return responseError;
    },
);

export default apiMobile;
