import React from 'react';
import P from 'prop-types';
import { ProfileImageSpecialist } from '@/app/_components/Card/Shared/ProfileImageSpecialist';
import { ContactsList } from '@/app/_components/Card/Shared/ContactsList';
import { ContactsListItem } from '@/app/_components/Card/Shared/ContactsListItem';

export function ContactsWrapper({ contacts, gender, className }) {
  return (
    <div className={className}>
      <ProfileImageSpecialist gender={gender} />
      <ContactsList>
        {contacts.map(contact => (
          <ContactsListItem key={contact.content} contact={contact} />
        ))}
      </ContactsList>
    </div>
  );
}

ContactsWrapper.propTypes = {
  contacts: P.array,
  gender: P.bool,
  className: P.string,
};
