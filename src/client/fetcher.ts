import axios from "axios";

export const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Accept-Language": "pt-BR",
  },
  baseURL: `https://lumi-back.onrender.com`,
  timeout: 90000,
});
