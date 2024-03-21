import { CheckboxGroupInput, ReferenceArrayInput, useGetList } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';

const PSYCHOTHERAPIST = 'психотерапевт';
const PSYCHOLOGIST = 'психолог';

export function SpecializationMethodsList({ specializationsIdList, type, className }) {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const { data: methodsData } = useGetList(RESOURCES.method);

  const specializationsWithMethodsList = specializationsIdList
    ? specializationsData
      ?.filter(
        ({ id, name }) =>
          specializationsIdList?.includes(id) &&
            (name.toLowerCase() === PSYCHOLOGIST || name.toLowerCase() === PSYCHOTHERAPIST),
      )
      .map(s => ({
        ...s,
        specializationMethods: methodsData
          ?.filter(m => m.specialization.name.toLowerCase() === s.name.toLowerCase())
          .map(({ id, title }) => ({ id, name: title })),
      }))
    : [];

  return (
    <ul className={className}>
      {specializationsWithMethodsList?.map(specialization => {
        const label = specialization.name.toLowerCase();

        return (
          <li key={specialization.id}>
            <Accordion className="mb-6">
              <AccordionSummary expandIcon={<FaAngleDown />}>Методи і напрямки для {label}a</AccordionSummary>
              <AccordionDetails>
                {type === 'create' ? (
                  <CheckboxGroupInput
                    source="specializationMethods"
                    name="specializationMethods"
                    choices={specialization.specializationMethods}
                    row={false}
                    label={false}
                  />
                ) : (
                  <ReferenceArrayInput source="specializationMethodsIds" reference="Method">
                    <CheckboxGroupInput optionText="title" row={false} label={false} />
                  </ReferenceArrayInput>
                )}
              </AccordionDetails>
            </Accordion>
          </li>
        );
      })}
    </ul>
  );
}

SpecializationMethodsList.propTypes = {
  specializationsIdList: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  className: PropTypes.string,
};
