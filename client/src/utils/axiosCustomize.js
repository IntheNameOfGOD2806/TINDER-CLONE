import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2807/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // config.headers.Authorization = access_token ? `Bearer ${access_token}` : null;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // setTimeout(() => {
    //     NProgress.done();
    // }, 1000)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    console.log(">>>>>>interceptor error:", error);
    if (error?.response?.data.EC === -999) {
      window.location.href = "/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
