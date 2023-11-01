import { findTextFromRegex } from "./utils.js";

const text =
  "This is a sample text with CNPJ numbers 12.345.678/0001-90 and 98.765.432/0002-10.";

// Regular expression to match CNPJ numbers
const cnpjRegex = /(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/g;

export const findCnpj = (text) => {
  return findTextFromRegex(text, cnpjRegex);
};

//console.log(findCnpj(text));
