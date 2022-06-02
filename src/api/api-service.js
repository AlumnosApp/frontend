import {createStore} from 'devextreme-aspnet-data-nojquery';
import {getIdToken} from "firebase/auth";
import DataSource from "devextreme/data/data_source";

const apiUrl = process.env.API_URL;
let token = '';
let userCache;

export const getWhoAmI = async (user) => {
    if (!user) user = userCache;
    else userCache = user;
    if(!user) return null;
    token = await getIdToken(user);
    return await getDs("whoami").load();
}

export const getDsOptions = (url, options) => {
    return new DataSource({
        store: getDs(url.toLowerCase()),
        ...options
    });
}

export const getDs = (api) => {
    const url = apiUrl + api.toLowerCase();
    return createStore({
        key: 'id',
        loadUrl: url,
        insertUrl: url,
        updateUrl: url,
        deleteUrl: url,
        onBeforeSend: (operation, ajaxSettings) => {
            ajaxSettings.headers = {
                'Authorization': token
            };
        }
    });
};
