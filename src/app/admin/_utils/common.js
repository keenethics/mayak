export const capitalizeFirstLetter = inputString => {
  if (typeof inputString !== "string") return;

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};