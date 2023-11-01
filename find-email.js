import { findTextFromRegex } from "./utils.js";

const text =
  "This is a sample text with email addresses example.email@gmail.com and another.email@example.com.";

const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;

export const findEmail = (text) => {
  return findTextFromRegex(text, emailRegex);
};

//console.log(findEmail(text));
