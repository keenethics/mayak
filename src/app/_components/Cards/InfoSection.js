import React from 'react';
import { MedCare, MedAttention, OnlineMeeting } from '@icons/index';
import { Specialist } from '@prisma/client';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecializationTextIcon } from './SpecializationTextIcon';
import { Paragraph } from '@/app/_components/Typography';
import { PillButton } from '@/app/_components/PillButton';
import { buttonType, buttonColorVariant } from '@/app/_components/PillButton/style';

function InfoSection() {
  //  Change this after we have DB
  const specializations = ['Посада', 'Посада', 'Посада'];
  const orgType = ['Тип організації 1', 'Тип 3', 'Тип 100500'];
  const nameOfSpecialist = "Прізвище ім'я по батькові";
  const nameOfClinic = 'Назва клініки';
  return (
    <div className="flex flex-col items-end gap-[16px] px-[12px] py-0">
      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start divide-y divide-dashed divide-gray-300">
          <div className="flex flex-col items-start gap-[24px]">
            <div className="flex w-[256px] flex-shrink-0 items-start gap-[10px]">
              <div className="flex flex-col items-start gap-[4px]">
                <SpecializationsPanel specializations={Specialist ? specializations : orgType} />
                <Paragraph className="text-center text-p2 font-bold text-gray-700">
                  {Specialist ? nameOfSpecialist : nameOfClinic}
                </Paragraph>
              </div>
            </div>
            <div className="flex w-[586px] items-start gap-[16px]">
              <SpecializationTextIcon icon={<MedCare />} text={'10 років на ринку'} className="text-other-green" />
              <SpecializationTextIcon
                icon={<MedAttention />}
                text={'Безкоштовний прийом'}
                className="text-other-orange"
              />
              <SpecializationTextIcon
                icon={<OnlineMeeting />}
                text={'Онлайн консультації'}
                className="text-other-blue"
              />
            </div>
          </div>
          {/* Auto stroke line from Tailwind */}
          <div className="flex w-[586px] flex-shrink-0 flex-col items-start gap-[2px]">
            <Paragraph className="text-p3 font-bold text-gray-700">Опис</Paragraph>
            <Paragraph className="text-p3 text-gray-700">Місто/село</Paragraph>
            <Paragraph className="text-p3 text-gray-700">Вулиця, номер будинку, поверх, кабінет</Paragraph>
          </div>
          {/* Auto stroke line from Tailwind */}
        </div>
      </div>
      <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.orange}>
        Детальніше
      </PillButton>
    </div>
  );
}

export { InfoSection };
