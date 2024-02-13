const contacts = [
  {
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    validate: false,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Пошта',
    validate: false,
  },
  {
    name: 'website',
    type: 'url',
    label: 'Веб сторінка',
    validate: false,
  },
];

const general = [
  {
    name: 'lastName',
    type: 'text',
    label: 'Прізвище',
    validate: true,
  },
  {
    name: 'firstName',
    type: 'text',
    label: "Ім'я",
    validate: true,
  },
  {
    name: 'surname',
    type: 'text',
    label: 'По-батькові',
    validate: false,
  },
];

const SpecialistFormFields = {
  general,
  contacts,
  specializations: {
    name: 'specializations',
    type: 'text',
    label: 'Спеціалізація',
    validate: true,
  },
  gender: {
    name: 'gender',
    type: 'text',
    label: 'Стать',
    validate: true,
  },
  yearsOfExperience: {
    name: 'yearsOfExperience',
    type: 'text',
    label: 'Роки стажу',
    validate: true,
  },
  formatOfWork: {
    name: 'formatOfWork',
    type: 'text',
    label: 'Формат послуг',
    validate: true,
  },
  placesOfWork: {
    name: 'placesOfWork',
    type: null,
    label: 'Адреса',
    validate: true,
  },
  fullAddress: {
    name: 'fullAddress',
    type: 'text',
    label: 'Повна адреса',
    validate: true,
  },
  nameOfClinic: {
    name: 'nameOfClinic',
    type: 'text',
    label: 'Назва клініки',
    validate: false,
  },
  district: {
    name: 'district',
    type: null,
    label: 'Район',
    validate: true,
  },
  therapies: {
    name: 'therapies',
    type: null,
    label: 'Тип терапії',
    validate: true,
  },
  isFreeReception: {
    name: 'isFreeReception',
    type: 'checkbox',
    label: 'Безкоштовний прийом',
    validate: false,
  },
  description: {
    name: 'description',
    type: 'text',
    label: 'Опис',
    validate: false,
  },
};

const SpecialistFormBlocks = {
  general: 'Основні данні',
  details: 'Деталі',
  placesOfWOrk: 'Місце надання послуг',
  services: 'Послуги',
  contacts: 'Контактні данні',
};

export { SpecialistFormFields, SpecialistFormBlocks };
