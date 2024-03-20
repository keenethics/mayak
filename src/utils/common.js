export const displayYearsOfExperience = amountOfYears => {
  if (typeof amountOfYears !== 'number') {
    return null;
  }

  const lastDigit = amountOfYears % 10;
  const lastTwoDigits = amountOfYears % 100;

  if (amountOfYears === 0) {
    return `менше року`;
  }

  if ((amountOfYears === 1 || lastDigit === 1) && lastTwoDigits !== 11) {
    return `рік`;
  }

  if (
    ((amountOfYears >= 2 && amountOfYears <= 4) || (lastDigit >= 2 && lastDigit <= 4)) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `роки`;
  }

  return `років`;
};

export const formatPhoneNumber = phoneNumber => {
  const countryCode = phoneNumber.slice(0, 3);
  const areaCode = phoneNumber.slice(3, 6);
  const firstPart = phoneNumber.slice(6, 9);
  const secondPart = phoneNumber.slice(9);

  return `${countryCode} (${areaCode}) ${firstPart} ${secondPart}`;
};

export const capitalizeFirstLetter = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);
