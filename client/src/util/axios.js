import axios from "axios";
const backend_url = import.meta.env.VITE_API_BACKENDURL;
const port = import.meta.env.VITE_API_PORT;

const instance = axios.create({
  baseURL: backend_url,
});
export default instance;
