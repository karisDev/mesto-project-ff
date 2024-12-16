import { UserService } from "../api/userService";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

export let user = {
  id: "",
  name: "",
  about: "",
  avatar: "",
};

export const initUser = async () => {
  const res = await UserService.me();

  user = {
    ...res,
    id: res._id,
  };

  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  profileImage.style = `background-image: url('${res.avatar}')`;

  return res;
};

export const updateUser = (name, about) => {
  user.name = name;
  user.about = about;
  profileTitle.textContent = name;
  profileDescription.textContent = about;
};
