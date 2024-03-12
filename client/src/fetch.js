const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL ?
  process.env.REACT_APP_BACKEND_BASE_URL : "http://localhost:3001";

const backendFetch = async (url = "", options = null) => {
  const URL = `${BACKEND_URL}${url}`;
  const response = fetch(URL, options);
  return response;
}

export default backendFetch;