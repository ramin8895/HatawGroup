import { message } from "antd";
import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

axios.defaults.headers.post["Content-Type"] = "application/json";
//  axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Expose-Headers"] = "*";

// axios.interceptors.request.use(function (config) {
// const token = store.getState().session.token;
// config.headers.Authorization = token;
// config.headers["Content-Type"] = "application/json;";
// return config;
// });
let cachedSession = null;

axios.interceptors.request.use(
    async (request) => {
        const session = await getSession();

        if (!cachedSession) {
            cachedSession = await getSession();
        }

        if (session) {
            // JWT token
            request.headers["x-auth-token-dist"] = `${session.accessToken}`;

            // Add license key (if available in session, localStorage, etc.)
            const licenseKey = localStorage.getItem("licenseKey");
            if (licenseKey) {
                request.headers["x-license-key"] = licenseKey;
            }
        }

        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    // if (
    //   error.response.status === 401 &&
    //   error.response.data == "Invalid token."
    // )

    if (error.response.status === 401) {
      message.error("لطفا مجددا وارد شوید!");
      signOut();
    }

    // if (error.response.status === 401) {
    //   window.addEventListener("beforeunload", (event) => {
    //     if (event.returnValue) {
    //     } else {
    //       message.error("لطفا مجددا وارد شوید!");
    //       signOut();
    //     }
    //   });
    // }

    return Promise.reject(error);
  }
);
// axios.interceptors.response.use(null, (error) => {
//   const expectedErrors =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (!expectedErrors) {
//     console.error(`مشکلی از سمت سرور رخ داده است.${error.response}`);
//   }
//   return Promise.reject(error);
// });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
