    // Generate random ID
export const generateRandomID = (code) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${code}${randomNumber}`;
};