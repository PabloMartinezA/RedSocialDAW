import { error, warning } from "components/alerts";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL ?
  process.env.REACT_APP_BACKEND_BASE_URL : "http://localhost:3001";

const api = async (url = "", options = null) => {
  const URL = `${BACKEND_URL}${url}`;
  try {
    const response = await fetch(URL, options);
    const data = await response.json();
    if (response.ok) {

      return data;
    } else if (response.status !== 500) {
      warning(data.msg);
      return;
    }
    error(Error(data.error));
  } catch (err) {
    error(err);
  }
}

export default api;