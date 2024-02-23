export const displayYearsOfExperience = amountOfYears => {
  const lastDigit = amountOfYears % 10;

  if (amountOfYears === 0) {
    return `${amountOfYears} рік`;
  }

  if (amountOfYears === 1 || lastDigit === 1) {
    return `${amountOfYears} рік`;
  }

  if ((amountOfYears >= 2 && amountOfYears <= 4) || (lastDigit >= 2 && lastDigit <= 4)) {
    return `${amountOfYears} роки`;
  }

  return `${amountOfYears} років`;
};
