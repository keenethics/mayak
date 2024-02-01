"use client";

import { signIn, signOut } from "next-auth/react";
import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  EditGuesser,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  Form,
  SelectField,
  SelectInput,
  SelectArrayInput,
  RadioButtonGroupInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  CheckboxGroupInput,
  regex,
} from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";
import { useState } from "react";

const authProvider = ({ signIn, signOut }) => ({
  login: async (credentials) => {
    console.log("login", credentials);
    return signIn(credentials);
  },
  logout: () => {
    console.log("logout");
    return signOut();
  },
  checkError: ({ status }) => Promise.resolve(),
  // checkError: ({ status }) => {
  // if (status === 401 || status === 403) {
  //   localStorage.removeItem("username");
  //   return Promise.reject();
  // }
  // return Promise.resolve();
  // },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => Promise.resolve(),
  // checkAuth: () => {
  // return Promise.resolve();
  // console.log("checkAuth");
  // return localStorage.getItem("username")
  //   ? Promise.resolve()
  //   : Promise.reject();
  // },
  getPermissions: () => Promise.resolve(),
});

const validateSpecialistCreation = (values) => {
  const errors = {};
  console.log(values);
  if (!values.Specialization_position) {
    errors.Specialization_position =
      "The Specialization / position is required";
  }
  if (!values.full_name) {
    errors.full_name = "The full name is required";
  }
  if (!values.sex) {
    errors.sex = "The sex is required";
  }
  if (!values.service_format) {
    errors.service_format = "The service format is required";
  }
  if (!values.full_address) {
    errors.full_address = "The full address is required";
  }
  if (!values.district) {
    errors.district = "The district is required";
  }
  if (!values.type_of_therapy) {
    errors.type_of_therapy = "The type of therapy is required";
  }
  if (!values.free_admission) {
    errors.free_admission = "The free admission is required";
  }
  if (!values.description) {
    errors.description = "The description is required";
  }
  return errors;
};

export const SpecialistCreate = () => {
  const [serviceFormat, setServiceFormat] = useState("");
  const shouldShowAddressFields = serviceFormat !== "online";

  const onServiceFormatChange = (value) => {
    // console.log(value.target.value);
    setServiceFormat(value.target.value);
  };

  return (
    <Create>
      <SimpleForm validate={validateSpecialistCreation}>
        {/* <SelectArrayInput
          source="Specialization_position"
          choices={[
            { id: "admin", name: "Психологічний консультант" },
            { id: "u001", name: "Психотерапевт" },
            { id: "u002", name: "Психіатр" },
            { id: "u003", name: "Сексолог" },
            { id: "u004", name: "Соціальний працівник" },
          ]}
          validate={[required()]}
          label="Specialization / position"
        /> */}
        <CheckboxGroupInput
          source="Specialization_position"
          choices={[
            {
              id: "psychologicalConsultant",
              name: "Psychological consultant",
            },
            { id: "psychotherapist", name: "Psychotherapist" },
            { id: "psychiatrist", name: "Psychiatrist" },
            { id: "sexologist", name: "Sexologist" },
            { id: "SocialWorker", name: "Social worker" },
          ]}
          label="Specialization / position"
          validate={required()}
        />
        <TextInput
          source="full_name"
          validate={[required()]}
          style={{ width: "300px" }}
          label="Full name"
        />
        <div>
          <RadioButtonGroupInput
            source="sex"
            choices={[
              { id: "female", name: "female" },
              { id: "male", name: "male" },
            ]}
            validate={[required()]}
          />
        </div>
        <div>
          <NumberInput source="years_of_experience" min={0} />
        </div>
        <div>
          <SelectInput
            source="service_format"
            choices={[
              { id: "online", name: "online" },
              { id: "offline", name: "offline" },
              { id: "і online, і offline", name: " online, offline" },
            ]}
            validate={[required()]}
            onChange={onServiceFormatChange}
          />
        </div>
        {shouldShowAddressFields && (
          <div>
            <ArrayInput source="addresses">
              <SimpleFormIterator inline>
                <TextInput source="full_address" validate={[required()]} />
                <TextInput source="clinic_name" />
                <SelectInput
                  source="district"
                  choices={[
                    { id: "Личаківський", name: "Личаківський" },
                    { id: "Шевченківський", name: "Шевченківський" },
                    { id: "Франківський", name: "Франківський" },
                    { id: "Залізничний", name: "Залізничний" },
                    { id: "Галицький", name: "Галицький" },
                    { id: "Сихівський", name: "Сихівський" },
                  ]}
                  validate={[required()]}
                />
              </SimpleFormIterator>
            </ArrayInput>
          </div>
        )}

        <SelectArrayInput
          source="type_of_therapy"
          choices={[
            { id: "admin", name: "Індивідуальна" },
            { id: "u001", name: "Для дітей і підлітків" },
            { id: "u002", name: "Сімейна" },
            { id: "u003", name: "Групова" },
            { id: "u004", name: "Для пар" },
            { id: "u005", name: "Для бізнесу" },
          ]}
          validate={[required()]}
        />
        <div>
          <RadioButtonGroupInput
            source="free_admission"
            choices={[
              { id: "yes", name: "yes" },
              { id: "no", name: "no" },
            ]}
            validate={[required()]}
          />
        </div>
        <TextInput source="description" multiline />

        <p>Contacts</p>
        <TextInput source="days_and_hours_of_operation" />
        <TextInput
          source="phone_number"
          validate={regex(/^\+380\d{9,}$/, "Must be valid number phone")}
        />
        <TextInput source="Email" type="email" />
        <TextInput source="website" />
      </SimpleForm>
    </Create>
  );
};

export default function AdminPage() {
  // const { data: session } = useSession()
  // console.log("session", session);
  const data = dataProvider("/api/admin");
  const auth = authProvider({
    signIn: (credentials) =>
      signIn("credentials", credentials, { redirect: false }),
    signOut: () => signOut(),
    // signOut: () => Promise.resolve(),
  });
  return (
    <Admin dataProvider={data} authProvider={auth}>
      <Resource
        name="Therapy"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={SpecialistCreate}
      />
      <Resource
        name="Specialist"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  );
}
