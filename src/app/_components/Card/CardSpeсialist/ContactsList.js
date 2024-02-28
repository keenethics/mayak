import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';
import { ContactsListItem } from './ContactsListItem';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function ContactsList({ specialistId, contacts, className }) {
  return (
    <ul className={cn('flex w-full flex-col gap-[8px]', className)}>
      {contacts.map(contact =>
        contact.content ? <ContactsListItem specialistId={specialistId} key={contact.id} contact={contact} /> : '',
      )}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: P.arrayOf(specialistContactPropType),
  className: P.string,
  specialistId: P.string.isRequired,
};
