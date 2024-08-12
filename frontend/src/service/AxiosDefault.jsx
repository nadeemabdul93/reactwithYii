import axios from "axios";
const AxiosDefault = async ({ method, data, url, contentType }) => {
  const APIENDPOINT = "http://localhost:8080/";
  const AxiosDefault = axios.create({
    baseURL: APIENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    
    },
    withCredentials: true
  });

  AxiosDefault.interceptors.request.use(
    async function (config) {
      try {
        const Authorization = sessionStorage.getItem('token');
        config.headers.authorization = `${Authorization}`;
      } catch (err) {
        console.log("error",err)
        
      }
      return config;
    },
    function (error) {
      
      return Promise.reject(error);
    }
  );

  AxiosDefault.interceptors.response.use(
    function (response) {
      console.log("response",response);
      return response;
    },
    
  );
  return await AxiosDefault({
    method,
    data,
    url,
    contentType,
  });
};

export default AxiosDefault;
