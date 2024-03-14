import { useState, useEffect } from "react";
import api from "api";

export const useFetch = ({ url = "", options = null }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url, options) => {
    const fetchData = await api(`${url}`, options);
    setData(fetchData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(url, options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
};