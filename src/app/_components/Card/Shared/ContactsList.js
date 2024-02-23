import React from 'react';
import P from 'prop-types';
import { cn } from '@utils/cn';
import { ContactsListItem } from '@/app/_components/Card/Shared/ContactsListItem';

export function ContactsList({ contacts, className }) {
  return (
    <ul className={cn('line-clamp-1 flex flex-col gap-[8px]', className)}>
      {contacts.map(contact => (contact.content ? <ContactsListItem key={contact.id} contact={contact} /> : ''))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: P.array,
  className: P.string,
};
