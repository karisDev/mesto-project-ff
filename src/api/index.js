const BASE_URL = "https://mesto.nomoreparties.co/v1/cohort-mag-4";

const defaultConfig = {
  headers: {
    authorization: "7bc73387-d839-4c07-aa41-0cb91aef59c3",
    "Content-Type": "application/json",
  },
};

const handleRequest = async (req) => {
  const res = await req();

  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.statusText}`);
};

const get = (path) =>
  handleRequest(() =>
    fetch(`${BASE_URL}${path}`, { ...defaultConfig, method: "GET" })
  );

const post = (path, body) =>
  handleRequest(() =>
    fetch(`${BASE_URL}${path}`, {
      ...defaultConfig,
      method: "POST",
      body: JSON.stringify(body),
    })
  );

const put = (path, body) =>
  handleRequest(() =>
    fetch(`${BASE_URL}${path}`, {
      ...defaultConfig,
      method: "PUT",
      body: JSON.stringify(body),
    })
  );

const del = (path) =>
  handleRequest(() =>
    fetch(`${BASE_URL}${path}`, { ...defaultConfig, method: "DELETE" })
  );

const patch = (path, body) =>
  handleRequest(() =>
    fetch(`${BASE_URL}${path}`, {
      ...defaultConfig,
      method: "PATCH",
      body: JSON.stringify(body),
    })
  );

export default {
  get,
  post,
  delete: del,
  patch,
  put,
};
