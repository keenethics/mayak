import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import { ContactsListItem } from './ContactsListItem';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function ContactsList({ truncate, specialistId, contacts, className }) {
  return (
    <ul className={cn('flex w-full flex-col gap-[8px]', className)}>
      {contacts.map(contact =>
        contact.content ? (
          <ContactsListItem truncate={truncate} specialistId={specialistId} key={contact.id} contact={contact} />
        ) : (
          ''
        ),
      )}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(specialistContactPropType),
  className: PropTypes.string,
  specialistId: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};
