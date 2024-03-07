import React from 'react';
import { useWatch } from 'react-hook-form';
import { TextInput } from 'react-admin';
import PropTypes from 'prop-types';
import { MatchingEntityList } from '@admin/_components';
import { EMAIL, PHONE } from '@admin/_lib/consts';

export function Contacts({ className }) {
  const currentPhone = useWatch({ name: PHONE });
  const currentEmail = useWatch({ name: EMAIL });
  const matchingParams = { phone: currentPhone, email: currentEmail };

  return (
    <>
      <div className={className}>
        <TextInput label="Номер телефону" source="phone" />
        <TextInput label="Пошта" source="email" />
        <TextInput label="Вебсайт" source="website" />
      </div>
      <MatchingEntityList matchingParams={matchingParams} className="mb-7" />
    </>
  );
}

Contacts.propTypes = {
  className: PropTypes.string,
};
