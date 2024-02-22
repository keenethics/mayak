import React from 'react';
import { Calendar, Clock, Mail, Phone } from '@icons/index';
import PropType from 'prop-types';
import { ContactsWrapper } from '@/app/_components/Card/Shared/ContactsWrapper';
import { CardWrapper } from '@/app/_components/Card/Shared/CardWrapper';
import { InfoWrapper } from '@/app/_components/Card/Shared/InfoWrapper';

export function CardSpecialist({ firstName, lastName, gender }) {
  const contacts = [
    {
      icon: <Phone />,
      content: '+38 099 123 4567',
      href: 'tel:+380991234567',
    },
    {
      icon: <Mail />,
      content: 'user@gmail.com',
      href: 'mailto:user@gmail.com',
    },
    {
      icon: <Calendar />,
      content: 'www.website.com',
      href: 'www.website.com',
    },
    {
      icon: <Clock />,
      content: ['пн-пт 9:00-18:00', 'ср-чт 18:00-20:00', 'ср-чт 08:00-13:00'],
      href: null,
    },
  ];

  return (
    <CardWrapper>
      <ContactsWrapper contacts={contacts} gender={gender} className="hidden md:block" />
      <InfoWrapper gender={gender} firstName={firstName} lastName={lastName} className="md:ml-[16px]" />
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  firstName: PropType.string,
  lastName: PropType.string,
  gender: PropType.bool,
};
