import { UserService } from "../api/userService";
import { closePopup, openPopup } from "./popup";
import { updateUser, user } from "./user";
import { SELECTOR, toggleSubmitButtonLoader } from "./validation";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector(".popup_type_edit");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileImage = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(".popup_edit-profile-image");
const formNewAvatar = document.forms.namedItem("edit-profile-image");
const newProfileImage = document.querySelector("#profile-image-url-input");

export const initProfile = () => {
  if (!user.id) throw new Error("user is not initialized");

  profileEditButton.addEventListener("click", () => {
    openPopup(profileEditForm);
    nameInput.value = user.name;
    jobInput.value = user.about;
    resetForm();
  });

  profileImage.addEventListener("click", () => {
    const submitButton = profileAvatarForm.querySelector(SELECTOR.submitButton);
    disableSubmitButton(submitButton);
    resetForm(profileAvatarForm);
    openPopup(profileAvatarForm);
    formNewAvatar.reset();
  });

  profileEditForm.addEventListener("submit", submitProfileForm);
  profileAvatarForm.addEventListener("submit", submitAvatarForm);
};

const resetForm = () => {
  profileEditForm
    .querySelectorAll(SELECTOR.input)
    .forEach((el) => hideError(profileEditForm, el));
};

const hideError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(SELECTOR.inputErrorClass);
  errorElement.classList.remove(SELECTOR.errorClass);
  errorElement.textContent = "";
};

const disableSubmitButton = (button) => {
  button.disabled = true;
  button.classList.add(SELECTOR.inactiveButtonClass);
};

const submitProfileForm = (e) => {
  e.preventDefault();
  const submitButton = profileEditForm.querySelector(SELECTOR.submitButton);
  toggleSubmitButtonLoader(submitButton, true);

  UserService.update(nameInput.value, jobInput.value)
    .then((profileInfo) => {
      updateUser(profileInfo.name, profileInfo.about);
      closePopup(profileEditForm);
    })
    .catch(console.error)
    .finally(() => toggleSubmitButtonLoader(submitButton, false));
};

const submitAvatarForm = (e) => {
  e.preventDefault();
  const submitButton = profileAvatarForm.querySelector(SELECTOR.submitButton);
  toggleSubmitButtonLoader(submitButton, true);

  UserService.updateAvatar(newProfileImage.value)
    .then((res) => {
      profileImage.style = `background-image: url('${res.avatar}')`;
      closePopup(profileAvatarForm);
      formNewAvatar.reset();
    })
    .catch(console.error)
    .finally(() => toggleSubmitButtonLoader(submitButton, false));
};
