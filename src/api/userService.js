import api from ".";

export const UserService = {
  me: () => api.get("/users/me"),
  update: (name, about) =>
    api.patch("/users/me", {
      name,
      about,
    }),
  updateAvatar: (avatar) => api.patch("/users/me/avatar", { avatar }),
};
