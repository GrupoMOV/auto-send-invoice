export const findTextFromRegex = (text, regex) => {
  try {
    const matches = text.match(regex);
    return matches;
  } catch (error) {}
};
