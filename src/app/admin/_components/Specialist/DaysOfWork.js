'use client';

import React from 'react';
import { ArrayInput, FormDataConsumer, required, SelectArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import { DaysOfWeek } from '@prisma/client';
import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormSections, SpecialistFormFields } from '@/app/admin/_lib/specialistData';
import { getChoicesListFromEnum } from '@/app/admin/_utils/getChoicesListFromEnum';
import { transformDaysOfWork } from '@/app/admin/_utils/transformSpecialistFormData';
import { formatDaysOfWork } from '@/utils/formatDaysOfWorks';

export function DaysOfWork() {
  const daysOfWeekChoicesList = getChoicesListFromEnum(DaysOfWeek);
  const { daysOfWeek, daysOfWork, timeRanges, timeRange } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormSections.daysOfWork} className="mt-3">
      <FormDataConsumer>
        {({ formData: outerFormData }) => (
          <>
            {outerFormData.daysOfWork && (
              <p>Текстовий формат графіку роботи: {formatDaysOfWork(transformDaysOfWork(outerFormData.daysOfWork))}</p>
            )}
            <ArrayInput
              name={daysOfWork.name}
              source={daysOfWork.name}
              label={daysOfWork.label}
              validate={daysOfWork.validate && required()}
              fullWidth
            >
              <SimpleFormIterator inline>
                <FormDataConsumer>
                  {({ formData, getSource }) => {
                    const daysOfWorkIndexedSource = getSource().split('.').slice(0, -1).join('.');
                    const currentDayOfWorkIndex = parseInt(daysOfWorkIndexedSource.split('.').at(-1), 10);
                    const daysOfWorkFormData = formData[daysOfWork.name];
                    const selectedDays = new Set();
                    daysOfWorkFormData.forEach((dayOfWork, i) => {
                      if (i !== currentDayOfWorkIndex) {
                        const daysOfWeekFormData = dayOfWork[daysOfWeek.name] || [];
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
                          name={`${daysOfWorkIndexedSource}.${daysOfWeek.name}`}
                          source={`${daysOfWorkIndexedSource}.${daysOfWeek.name}`}
                          label={daysOfWeek.label}
                          choices={filteredDaysOfWeekChoices}
                          validate={daysOfWeek.validate && required()}
                          className="flex-1"
                        />
                        <ArrayInput
                          name={`${daysOfWorkIndexedSource}.${timeRanges.name}`}
                          source={`${daysOfWorkIndexedSource}.${timeRanges.name}`}
                          label={timeRanges.label}
                          validate={timeRanges.validate && required()}
                          fullWidth
                        >
                          <SimpleFormIterator inline>
                            <TextInput
                              fullWidth
                              source={timeRange.name}
                              label={timeRange.label}
                              validate={timeRange.validate && required()}
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
    </FormFieldWrapper>
  );
}
