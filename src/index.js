import "./pages/index.css";
import { initUser } from "./components/user.js";
import { initCards } from "./components/card.js";
import { initPopups } from "./components/popup.js";
import { initProfile } from "./components/profile.js";
import { enableValidation } from "./components/validation.js";

initPopups();
enableValidation();
initUser().then(() => {
  initCards();
  initProfile();
});
