export const getAgeFromDate = (birthdateInput) => {
  // console.log('getAgeFromDate - birthdateInput:', birthdateInput);
  const [dd, mm, yyyy] = birthdateInput.split("/");
  const birthDate = new Date(`${yyyy}-${mm}-${dd}`);
  // console.log('getAgeFromDate - birthDate:', birthDate);
  const currentDate = new Date();
  const diff = currentDate - birthDate; // This is the difference in milliseconds
   // Divide by 1000*60*60*24*365.25
  return Math.floor(diff / 31557600000);
}

/**
 * The maximum is exclusive and the minimum is inclusive
 * @param min
 * @param max
 * @returns {number}
 */
export const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
