import { useCallback, useEffect, useState } from "react";
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

export function useHttp(url, options = {}, immediate = false) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const realFetch = useCallback(
    async (options) => {
      try {
        setLoading(true);
        const res = await (await http(url, options)).json();
        if (res.error) {
          throw new Error(res.error);
        }
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  immediate && realFetch(options);

  return {
    data,
    error,
    loading,
    doHttp: realFetch,
  };
}
