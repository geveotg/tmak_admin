import axios from "axios";

const request = (method, url, body, callback, errorCallback, notTimeout) => {
    let myAxios = axios.create();

    myAxios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("TOKEN")}`;

    myAxios[method](url, method === "delete" ? { data: body } : body)
        .then((response) => {
            if (response.error) {
                if (response.data === "Forbiden") {
                    window.location.href = "#";
                }

                if (errorCallback) {
                    errorCallback(response?.data);
                }
            } else {
                callback(response?.data);
            }
        })
        .catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            }
        });
};

export default request;
