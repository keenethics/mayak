import { Clock, Mail, Phone, Site } from '@icons/index';

export const contacts = data => {
  const { phone, email, website } = data || {};

  return [
    {
      id: 'phone',
      icon: <Phone />,
      content: phone,
      href: null,
    },
    {
      id: 'email',
      icon: <Mail />,
      content: email,
      href: null,
    },
    {
      id: 'website',
      icon: <Site />,
      content: website,
      href: website,
    },
    {
      id: 'schedule',
      icon: <Clock />,
      content: ['пн-пт 9:00-18:00', 'ср-чт 18:00-20:00', 'ср-чт 08:00-13:00'],
      href: null,
    },
  ];
};
