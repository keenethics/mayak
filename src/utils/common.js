export const displayYearsOfExperience = amountOfYears => {
  const lastDigit = amountOfYears % 10;

  if (amountOfYears === 0) {
    return `стаж менше року`;
  }

  if (amountOfYears === 1 || lastDigit === 1) {
    return `${amountOfYears} рік стажу`;
  }

  if ((amountOfYears >= 2 && amountOfYears <= 4) || (lastDigit >= 2 && lastDigit <= 4)) {
    return `${amountOfYears} роки стажу`;
  }

  return `${amountOfYears} років стажу`;
};
