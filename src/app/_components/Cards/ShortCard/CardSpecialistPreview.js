import React from 'react';
import { Calendar, Clock, Mail, MedAttention, MedCare, OnlineMeeting, Phone } from '@icons/index';
import { cn } from '@utils/cn';
import { PillButton } from '@components';
import Link from 'next/link';
import { SpecialistProfileImage } from '@/app/_components/Cards/ShortCard/Specialist/SpecialistProfileImage';
import { SpecializationTextIcon } from '@/app/_components/Cards/SpecializationTextIcon';
import { buttonColorVariant, buttonType } from '@/app/_components/PillButton/style';
import { ContactText } from '@/app/_components/Cards/ContactText';

export function CardSpecialistPreview() {
  const tags = ['психодинамічний', 'когнітивний', 'біхевіоральний', 'військові', 'супровід у психіатрії'];
  const labels = [
    {
      icon: <MedCare />,
      content: '10 років досвіду',
      color: 'text-other-green',
    },
    {
      icon: <MedAttention />,
      content: 'Безкоштовний прийом',
      color: 'text-other-orange',
    },
    {
      icon: <OnlineMeeting />,
      content: 'Онлайн консультації',
      color: 'text-other-blue',
    },
  ];

  const contacts = [
    {
      icon: <Phone />,
      content: '+38 (099) 123 45 67',
      href: 'tel:+380991234567',
    },
    {
      icon: <Mail />,
      content: 'user@gmail.com',
      href: 'mailto:user@gmail.com',
    },
    {
      icon: <Calendar />,
      content: 'www.website.com',
      href: 'www.website.com',
    },
    {
      icon: <Clock />,
      content: ['пн-пт 9:00-18:00', 'ср-чт 18:00-20:00', 'ср-чт 08:00-13:00'],
      href: null,
    },
  ];

  return (
    <div className="m-[16px] max-w-[906px] rounded-[24px]  border-2 border-gray-200 px-[15px] py-[20px] md:flex md:p-[40px] lg:mx-auto">
      <div className="hidden md:block">
        <SpecialistProfileImage />
        <ul className="mt-[16px] flex flex-col gap-[8px]">
          {contacts.map(({ icon, content, href }) => (
            <li className="flex gap-[8px]" key={content}>
              <span className="flex w-[20px] justify-center">{icon}</span>
              <ContactText>
                {Array.isArray(content) ? (
                  content.map(c => <p key={c}>{c}</p>)
                ) : (
                  <Link href={href} target="_blank">
                    {content}
                  </Link>
                )}
              </ContactText>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:ml-[16px]">
        <header className="flex gap-[10px]">
          <SpecialistProfileImage className="md:hidden" />
          <div>
            <h2 className="text-[12px] font-bold uppercase leading-[20px] text-gray-600 md:text-p4">Психотерапевт</h2>
            <span className="text-p3 font-bold text-gray-700 md:text-p1">Володимир Підгородецький</span>
          </div>
        </header>
        <div className="mt-[16px] flex gap-[10px] md:flex-initial md:gap-[24px]">
          {labels.map(({ icon, content, color }) => (
            <SpecializationTextIcon
              icon={icon}
              key={content}
              text={content}
              className={cn('md:flex-0 flex-1 text-other-green md:flex-shrink', color)}
            />
          ))}
        </div>
        <div className="mt-[14px]">
          <h3 className="text-p4 font-bold uppercase text-gray-600">Напрямок лікування</h3>
          <div className="mt-[14px] flex flex-wrap gap-[10px]">
            {tags.map(t => (
              <span key={t} className="rounded-[24px] bg-primary-100 px-[12px] py-[4x] text-c3 text-primary-600">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="mt-[12px] text-p2 font-bold text-gray-700">Назва клініки</h3>
          <p>Місто/село</p>
          <p>Вулиця, номер будинку, поверх, кабінет</p>
        </div>
        <PillButton
          type={buttonType.outlined}
          colorVariant={buttonColorVariant.outlined.orange}
          className="ml-auto mt-[16px] block"
        >
          Детальніше
        </PillButton>
      </div>
    </div>
  );
}
