import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "api";

export const useFetch = ({ url = "", options = null }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      setData(undefined);
      options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
      const fetchData = await api(`${url}`, options);
      setData(fetchData);
      setLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading];
};