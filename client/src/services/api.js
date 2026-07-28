import axios from "axios";

const api = axios.create({
       baseURL : "https://ai-study-hub-kzfp.onrender.com/api"
})

export default api;