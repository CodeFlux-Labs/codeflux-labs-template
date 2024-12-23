import axios from "axios";
import { HOST_NAME, WEB_SERVER } from "@env";
import { TOKEN } from "../utils/const";
import { getUser } from "../../utils/index";
import { store } from "../store";
import { resetDataToLogout, setLogoutMessage, setUser } from "../store/Actions/HeaderActions";

//= ==========================================================================================
const apiWeb = axios.create({
    baseURL: `$https://${HOST_NAME}:${WEB_SERVER}`,
    timeout: 25000,
});

//= ==============================================================================================
// ---- Request Middleware
apiWeb.interceptors.request.use(async request => {
    if (request.url !== "/api/usuario/login") {
        const savedToken = await AsyncStorage.getItem(TOKEN);
        const user = await getUser();

        let token = savedToken || user?.TOKEN;

        if (token) {
            try {
                token = savedToken || user?.TOKEN;
                request.headers["x-access-token"] = token;
                request.data.user = { IDS001: user?.IDS001, DSEMALOG: user?.DSEMALOG };
            } catch (err) {
                console.log("ERROR_TOKEN: ", err);
            }
        }
    }

    return request;
});

// = ==============================================================================================
// ---- Response Middleware
apiWeb.interceptors.response.use(
    async responseSuccess => {
        const newToken = responseSuccess?.headers["x-access-token"];

        if (newToken) await AsyncStorage.setItem(TOKEN, newToken);

        return responseSuccess;
    },
    async responseError => {
        const isUserlogged = store.getState().header.user;

        if (String(responseError).includes("401") || responseError?.response?.status === 401) {
            axios.CancelToken.source().cancel(
                "Cancelling all pending requests because of a 401 error.",
            );

            await AsyncStorage.removeItem(TOKEN);
            store.dispatch(resetDataToLogout());
            store.dispatch(setLogoutMessage(responseError?.response?.data?.message));
            store.dispatch(setUser(false));
        }

        return Promise.reject(responseError);
    },
);

export default apiWeb;
