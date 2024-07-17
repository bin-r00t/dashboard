import { getToken } from "./auth";

const __DEV__ = process.env.NODE_ENV == "development";
const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function http(url, options = defaultOptions) {
  const tokenObj = getToken();
  if (tokenObj) {
    options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj.token}`,
      ...options.headers,
    };
  }
  const serverUrl = `${__DEV__ ? "http://localhost:9000" : "https://liubin.website/v1"}${url}`;
  return fetch(serverUrl, options);
}
