import api from ".";

export const CardService = {
  get: () => api.get("/cards"),
  create: (name, link) => api.post("/cards", { name, link }),
  delete: (id) => api.delete(`/cards/${id}`),
  like: (id) => api.put(`/cards/likes/${id}`),
  dislike: (id) => api.delete(`/cards/likes/${id}`),
};
