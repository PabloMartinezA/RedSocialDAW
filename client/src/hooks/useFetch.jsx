import { useState, useEffect } from "react";
import { BACKEND_URL } from "fetch";

export const useFetch = ({ url = "", options = null }) => {
  const [data, setData] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (url, options) => {
    try {
      const fetchResponse = await fetch(`${BACKEND_URL}${url}`, options);
      const fetchData = await fetchResponse.json();
      setResponse(fetchResponse);
      setData(fetchData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url, options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, response, error, loading };
};