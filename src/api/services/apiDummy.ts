import axios from "axios";

//= ==========================================================================================
export const apiDummy = axios.create({
    baseURL: `https://dummyjson.com`,
    timeout: 25000,
});
