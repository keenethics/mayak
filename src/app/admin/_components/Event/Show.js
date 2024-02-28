import React from 'react';
import PropTypes from 'prop-types';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import {
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  DateField,
  NumberField,
  BooleanField,
  useGetRecordId,
  Labeled,
  useGetOne,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { TagList } from './TagList';

function ShowLayout() {
  const eventId = useGetRecordId();
  const { data, isLoading, error } = useGetOne(RESOURCES.event, { id: eventId });
  return (
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="organizerName" />
      <RichTextField source="notes" emptyText="No notes..." />
      <TextField source="format" />
      {data?.format === EventFormat.OFFLINE && <TextField source="address" />}
      {data?.locationLink && <TextField source="locationLink" />}
      <DateField source="createdAt" />
      <DateField source="eventDate" />
      <TextField source="priceType" />
      {data?.priceType !== EventPriceFormat.FREE && <NumberField source="price" />}
      <BooleanField source="isActive" />
      <Labeled label="Event Tags">
        {data?.tags?.length ? (
          <TagList tags={data?.tags} isLoading={isLoading} error={error && 'Error happened while loading data'} />
        ) : (
          <TextField emptyText="No event tags" />
        )}
      </Labeled>
      {data?.additionalLink && (
        <Labeled label="Additional Link">
          <AdditionalLink label={data.additionalLink.label} link={data.additionalLink.link} />
        </Labeled>
      )}
    </SimpleShowLayout>
  );
}

// Must use a component for <Labeled/> wrapper to take effect
function AdditionalLink({ label, link }) {
  return (
    <div>
      <span>{label}</span>:{' '}
      <a className="text-[#0000EE]" href={link}>
        {link}
      </a>
    </div>
  );
}
AdditionalLink.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
};

export function EventShow() {
  return (
    <Show>
      <ShowLayout />
    </Show>
  );
}
