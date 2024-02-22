import React from 'react';
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
  UrlField,
} from 'react-admin';
import { TagList } from './TagList';
import { RESOURCES } from '../../_lib/consts';

function ShowLayout() {
  const eventId = useGetRecordId();
  const { data, isLoading, error } = useGetOne(RESOURCES.event, { id: eventId });
  return (
    <SimpleShowLayout>
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
        <>
          <TextField source="additionalLink.label" />
          <UrlField source="additionalLink.link" />
        </>
      )}
    </SimpleShowLayout>
  );
}
export function EventShow() {
  return (
    <Show>
      <ShowLayout />
    </Show>
  );
}
