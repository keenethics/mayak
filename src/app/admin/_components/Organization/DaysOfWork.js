'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { ArrayInput, FormDataConsumer, required, SelectArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import { DaysOfWeek } from '@prisma/client';
import { DaysOfWorkList } from '@admin/components';
import { getChoicesListFromEnum } from '@admin/_utils/getChoicesListFromEnum';
import { transformDaysOfWork } from '@admin/_utils/transformDaysOfWork';

export function DaysOfWork({ isActive }) {
  const daysOfWeekChoicesList = getChoicesListFromEnum(DaysOfWeek);

  return (
    <FormDataConsumer>
      {({ formData: outerFormData }) => (
        <>
          {outerFormData.daysOfWork && (
            <>
              <p>Текстовий формат графіку роботи:</p>
              <DaysOfWorkList rawDaysOfWork={transformDaysOfWork(outerFormData.daysOfWork)} />
            </>
          )}
          <ArrayInput source={'daysOfWork'} label={'Робочі дні'} validate={isActive && required()} fullWidth>
            <SimpleFormIterator inline>
              <FormDataConsumer>
                {({ formData, getSource }) => {
                  const daysOfWorkIndexedSource = getSource().split('.').slice(0, -1).join('.');
                  const currentDayOfWorkIndex = parseInt(daysOfWorkIndexedSource.split('.').at(-1), 10);
                  const daysOfWorkFormData = formData.daysOfWork;
                  const selectedDays = new Set();
                  daysOfWorkFormData.forEach((dayOfWork, i) => {
                    if (i !== currentDayOfWorkIndex) {
                      const daysOfWeekFormData = dayOfWork.daysOfWeek || [];
                      daysOfWeekFormData.forEach(el => selectedDays.add(el));
                    }
                  });
                  const filteredDaysOfWeekChoices = daysOfWeekChoicesList.map(el => ({
                    ...el,
                    disabled: selectedDays.has(el.id),
                  }));
                  return (
                    <>
                      <SelectArrayInput
                        name={`${daysOfWorkIndexedSource}.daysOfWeek`}
                        source={`${daysOfWorkIndexedSource}.daysOfWeek`}
                        label={'Дні тижня'}
                        choices={filteredDaysOfWeekChoices}
                        validate={required()}
                        className="flex-1"
                      />
                      <ArrayInput
                        name={`${daysOfWorkIndexedSource}.timeRanges`}
                        source={`${daysOfWorkIndexedSource}.timeRanges`}
                        label={'Робочі години'}
                        validate={required()}
                        fullWidth
                      >
                        <SimpleFormIterator inline>
                          <TextInput
                            fullWidth
                            source={'timeRange'}
                            label={'Проміжок часу'}
                            validate={required()}
                            helperText="Проміжок робочого часу у форматі hh:mm-hh:mm. Наприклад 09:40-15:00"
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </>
                  );
                }}
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        </>
      )}
    </FormDataConsumer>
  );
}

DaysOfWork.propTypes = {
  isActive: PropTypes.boolean,
};
