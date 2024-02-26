import {
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  required,
  DateTimeInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { EventForm } from './EventForm';

export const EventEdit = () => (
  <Edit>
    <EventForm />
  </Edit>
);
