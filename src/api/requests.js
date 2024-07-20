import request from "./request";
import URLS from "./url";
import requestQuery from "./requestQuery";

const REQUESTS = {
    LOGIN: (body, callback, errorCallback) => {
        request("post", URLS.login, body, callback, errorCallback);
    },

    FORGOT_PASSWORD: (body, callback, errorCallback) => {
        request("post", `${URLS.forgot_password}`, body, callback, errorCallback);
    },

    RESET_PASSWORD: (body, callback, errorCallback) => {
        request("post", `${URLS.reset_password}`, body, callback, errorCallback);
    },

    PROFILE: {
        GET: (callback, errorCallback) => {
            request("get", URLS.admin, callback, errorCallback);
        },

        EDIT: (body, callback, errorCallback) => {
            request("put", URLS.admin, body, callback, errorCallback);
        },
    },

    LANGUAGES: (query, callback) => {
        request("get", `${URLS.admin_languages}${requestQuery(query)}`, {}, callback);
    },

    LIVES_CHART: (callback, query) => {
        return request("get", `${URLS.LIVES_CHART}${requestQuery(query)}`, {}, callback);
    },

    // GET_LIVES: (callback, errorCallback, query) => {
    //     return request(
    //         "get",
    //         `${URLS.LIVES}${requestQuery(query)}`,
    //         {},
    //         callback,
    //         errorCallback
    //     );
    // },

    // MOVIES_CHART: (callback, query) => {
    //     return request(
    //         "get",
    //         `${URLS.MOVIES_CHART}${requestQuery(query)}`,
    //         {},
    //         callback
    //     );
    // },

    // GET_MOVIES: (callback, errorCallback, query) => {
    //     return request(
    //         "get",
    //         `${URLS.MOVIES}${requestQuery(query)}`,
    //         {},
    //         callback,
    //         errorCallback
    //     );
    // },

    // STATISTICS: {
    //     TOTALS: (callback) => {
    //         request("get", URLS.get_totals, {}, callback);
    //     },
    //     ONLINE_CLIENTS: (callback) => {
    //         request("get", URLS.online_clients, {}, callback);
    //     },
    //     SERVER_STATE: (callback) => {
    //         request("get", URLS.server_state, {}, callback);
    //     },

    //     SERVER: (callback) => {
    //         request("get", URLS.admin_server, {}, callback);
    //     },
    //     USED_DEVICES: (callback) => {
    //         request("get", URLS.admin_server, {}, callback);
    //     },

    //     COUNT_USED_DEVICES: (callback) => {
    //         request("get", URLS.used_devices, {}, callback);
    //     },
    //     CHART: (callback) => {
    //         request("get", URLS.chart, {}, callback);
    //     },

    //     DEVICE_CHART: (callback, errorCallback, query) => {
    //         return request(
    //             "get",
    //             `${URLS.device_chart}${requestQuery(query)}`,
    //             {},
    //             callback,
    //             errorCallback
    //         );
    //     },

    //     CART_PAYMENTS: (callback, errorCallback, query) => {
    //         return request(
    //             "get",
    //             `${URLS.chart_payments + requestQuery(query)}`,
    //             {},
    //             callback,
    //             errorCallback
    //         );
    //     },
    // },

    CATEGORIES: {
        GET: (query = {}, callback) => {
            request("get", URLS.categories + requestQuery(query), {}, callback);
        },
        ADD: (body, callback, errorCallback) => {
            request("post", URLS.categories, body, callback, errorCallback);
        },

        EDIT: (id, body, callback, errorCallback) => {
            request("put", `${URLS.categories}/${id}`, body, callback, errorCallback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.categories}/${id}`, {}, callback, errorCallback);
        },
    },

    SUBCATEGORIES: {
        GET: (id, query = {}, callback) => {
            request("get", `${URLS.categories}/${id}` + requestQuery(query), {}, callback);
        },
        ADD: (body, callback, errorCallback) => {
            request("post", URLS.subcategory, body, callback, errorCallback);
        },

        EDIT: (id, body, callback, errorCallback) => {
            request("patch", `${URLS.subcategory}/${id}`, body, callback, errorCallback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.subcategory}/${id}`, {}, callback, errorCallback);
        },
    },
    EMAIL: {
        GET: (query = {}, callback) => {
            request("get", `${URLS.email}` + requestQuery(query), {}, callback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.email}/${id}`, {}, callback, errorCallback);
        },
    },
    NEWS: {
        GET: (query = {}, callback) => {
            request("get", `${URLS.news}` + requestQuery(query), {}, callback);
        },

        GETPRODUCT: (id, callback) => {
            request("get", `${URLS.news}/${id}`, {}, callback);
        },
        ADD: (body, callback, errorCallback) => {
            request("post", URLS.news, body, callback, errorCallback);
        },

        EDIT: (id, body, callback, errorCallback) => {
            request("put", `${URLS.news}/${id}`, body, callback, errorCallback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.news}/${id}`, {}, callback, errorCallback);
        },

        ADDIMG: (id, body, callback, errorCallback) => {
            return request("post", `${URLS.news}/images/${id}`, body, callback, errorCallback);
        },

        DELETE_IMG: (id, callback, errorCallback) => {
            return request("delete", `${URLS.news}/images/${id}`, {}, callback, errorCallback);
        },
    },

    PUBLICATIONS: {
        GET: (query = {}, callback) => {
            request("get", `${URLS.publications}` + requestQuery(query), {}, callback);
        },

        GETPRODUCT: (id, callback) => {
            request("get", `${URLS.publications}/${id}`, {}, callback);
        },
        ADD: (body, callback, errorCallback) => {
            request("post", URLS.publications, body, callback, errorCallback);
        },

        EDIT: (id, body, callback, errorCallback) => {
            request("put", `${URLS.publications}/${id}`, body, callback, errorCallback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.publications}/${id}`, {}, callback, errorCallback);
        },

        ADDIMG: (id, body, callback, errorCallback) => {
            return request(
                "post",
                `${URLS.publications}/images/${id}`,
                body,
                callback,
                errorCallback
            );
        },

        DELETE_IMG: (id, callback, errorCallback) => {
            return request(
                "delete",
                `${URLS.publications}/images/${id}`,
                {},
                callback,
                errorCallback
            );
        },
    },

    DEVICE: {
        //sort:JSON.stringify(["createdAt","DESC"])
        GET: (query, callback) => {
            request("get", URLS.admin_devices + requestQuery(query), {}, callback);
        },

        ACTIVATE_DEVICE: (body, callback, errorCallback) => {
            request("post", URLS.activate_device, body, callback, errorCallback);
        },
        FREE_TRIAL: (body, callback, errorCallback) => {
            request("post", URLS.reset_free_trial, body, callback, errorCallback);
        },
        GET_PACKAGES: (callback) => {
            request("get", URLS.get_packajes, {}, callback);
        },

        GET_DEVICE: (id, query, callback) => {
            request("get", `${URLS.admin_devices}/${id}${requestQuery(query)}`, {}, callback);
        },

        DELETE_DEVICE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.admin_devices}`, { id }, callback, errorCallback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.admin_playlist}`, { id }, callback, errorCallback);
        },
        ADD: (body, callback, errorCallback) => {
            request("post", URLS.admin_playlist, body, callback, errorCallback);
        },

        EDIT_PLAYLIST: (body, callback, errorCallback) => {
            request("put", URLS.admin_playlist, body, callback, errorCallback);
        },
    },

    PAYMENTS: {
        GET: (query, callback) => {
            request("get", URLS.payments + requestQuery(query), {}, callback);
        },

        DELETE: (id, callback, errorCallback) => {
            return request("delete", `${URLS.payments}`, { id }, callback, errorCallback);
        },
    },

    LENG: {
        GET: (query, callback) => {
            request("get", URLS.admin_languages + requestQuery(query), {}, callback);
        },
        WORDS: (callback, errorCallback, query) => {
            return request(
                "get",
                `${URLS.words + requestQuery(query)}`,
                {},
                callback,
                errorCallback
            );
        },
        EDIT: (body, callback, errorCallback) => {
            request("put", URLS.admin_languages, body, callback, errorCallback);
        },

        TRANSLATIONS_PUT: (body, callback, errorCallback) => {
            request("put", URLS.admin_translations, body, callback, errorCallback);
        },

        ADD: (body, callback, errorCallback) => {
            request("post", URLS.admin_translations, body, callback, errorCallback);
        },
    },

    PAYMENT_SETTINGS: (callback) => {
        request("get", URLS.payment_settings, {}, callback);
    },

    EDIT_PAYMENT_SETTINGS: (body, callback, errorCallback) => {
        request("put", URLS.edit_payment_settings, body, callback, errorCallback);
    },

    DELETE: (id, callback, errorCallback) => {
        return request("delete", `${URLS.tickets}`, { id }, callback, errorCallback);
    },

    TRANSLATIONS: {
        GET: (query, callback, errorCallback) => {
            return request("get", `${URLS.TRANSLATIONS.GET}`, query, callback, errorCallback);
        },

        EDIT: (body, callback, errorCallback) => {
            request(
                "put",
                URLS.TRANSLATIONS.EDIT,
                { json_configs: JSON.stringify(body) },
                callback,
                errorCallback
            );
        },
    },
    RESELLER_TRANSLATION_UPDATE: (body, callback, errorCallback) => {
        request("put", URLS.RESELLER_TRANSLATION_UPDATE, body, callback, errorCallback);
    },
    IMA_CONFIG: {
        GET: (callback) => {
            request("get", `${URLS.IMA_CONFIG}`, {}, callback);
        },
        PUT: (body, callback, errorCallback) => {
            request("put", `${URLS.IMA_CONFIG}`, body, callback, errorCallback);
        },
    },
    CAPTCHA_FOR_LOGIN: (callback) => {
        return request("get", `${URLS.CAPTCHA_FOR_LOGIN}`, {}, callback);
    },
    SENT_CAPTCHA_TOKEN: (body, callback, errorCallback) => {
        request("post", URLS.CAPTCHA_FOR_LOGIN, body, callback, errorCallback);
    },
    CAPTCHA: {
        GET: (callback) => {
            return request("get", `${URLS.CAPTCHA}`, {}, callback);
        },
        PUT: (body, callback, errorCallback) => {
            request("put", URLS.CAPTCHA, body, callback, errorCallback);
        },
    },

    COUNTRIES: {
        GET: (query, callback, errorCallback) => {
            request("get", URLS.COUNTRIES + requestQuery(query), {}, callback, errorCallback);
        },
        PUT: (body, callback, errorCallback) => {
            request("put", URLS.COUNTRIES, body, callback, errorCallback);
        },
    },

    TOTAL_DEVICES: (callback) => {
        request("get", URLS.TOTAL_DEVICES, {}, callback);
    },
    RESELLERS_REGISTERED: (callback) => {
        request("get", URLS.RESELLERS_REGISTERED, {}, callback);
    },
    RESELLERS_ACTIVATION: (callback) => {
        request("get", URLS.RESELLERS_ACTIVATION, {}, callback);
    },
    DEVICE_PAYMENT: (callback) => {
        request("get", URLS.DEVICE_PAYMENT, {}, callback);
    },
    ONLINE_UESERS: (callback, query) => {
        request("get", URLS.ONLINE_USERS + requestQuery(query), {}, callback);
    },
    // CATEGORIES: {
    //     GET: (callback, errorCallback) => {
    //         request("get", URLS.CATEGORIES, {}, callback, errorCallback);
    //     },
    //     PUT: (callback, errorCallback, body) => {
    //         request("put", URLS.CATEGORIES, body, callback, errorCallback);
    //     },
    // },
    CONTENT_CATEGORIES: (callback, errorCallback) => {
        request("get", URLS.CONTENT_CATEGORIES, {}, callback, errorCallback);
    },
    GET_API_VERSION: (callback) => {
        request("get", URLS.GET_API_VERSION, {}, callback);
    },
    DEVICE_DEACTIVEATE: (body, callback, errorCallback) => {
        request("put", URLS.DEVICE_DEACTIVEATE, body, callback, errorCallback);
    },
};

export default REQUESTS;
