import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { ContactsListItem } from '@components';
import { specialistContactPropType } from '@/app/_components/CardSpecialist/prop-types';

export function ContactsList({ truncate, specialistId, contacts, className }) {
  const contactsFiltered = contacts.filter(contact => contact.content);

  return (
    <ul className={cn('flex w-full flex-col gap-2', className)}>
      {contactsFiltered.map(contact => (
        <ContactsListItem truncate={truncate} specialistId={specialistId} key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(specialistContactPropType),
  className: PropTypes.string,
  specialistId: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};
