import axios from "axios";

const instance = axios.create({
  baseURL: "https://pastebin-lite-liart.vercel.app/",
});

export default instance;
