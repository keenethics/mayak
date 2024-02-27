import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';
import { ContactsListItem } from './ContactsListItem';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function ContactsList({ contacts, className }) {
  return (
    <ul className={cn('flex flex-col gap-[8px]', className)}>
      {contacts.map(contact => (contact.content ? <ContactsListItem key={contact.id} contact={contact} /> : ''))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: P.arrayOf(specialistContactPropType),
  className: P.string,
};
