export const displayYearsOfExperience = amountOfYears => {
  const lastDigit = amountOfYears % 10;
  const lastTwoDigits = amountOfYears % 100;

  if (amountOfYears === 0) {
    return `стаж менше року`;
  }

  if ((amountOfYears === 1 || lastDigit === 1) && lastTwoDigits !== 11) {
    return `${amountOfYears} рік стажу`;
  }

  if (
    ((amountOfYears >= 2 && amountOfYears <= 4) || (lastDigit >= 2 && lastDigit <= 4)) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `${amountOfYears} роки стажу`;
  }

  return `${amountOfYears} років стажу`;
};

export const parsePhoneNumber = phoneNumber => {
  const countryCode = phoneNumber.slice(0, 3);
  const areaCode = phoneNumber.slice(3, 6);
  const firstPart = phoneNumber.slice(6, 9);
  const secondPart = phoneNumber.slice(9);

  return `${countryCode} (${areaCode}) ${firstPart} ${secondPart}`;
};

export function getRandomInt(min, max) {
  const minI = Math.ceil(min);
  const maxI = Math.floor(max);
  return Math.floor(Math.random() * (maxI - minI + 1)) + minI;
}
