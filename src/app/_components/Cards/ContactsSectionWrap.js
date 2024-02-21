import React from 'react';
import { Phone, Mail, Calendar, Clock } from '@icons/index';
import { Specialist } from '@prisma/client';
import { ContactSection } from './ContactSection';
import { ContactText } from './ContactText';
import { SpecialistProfileImage } from './ShortCard/Specialist/SpecialistProfileImage';
import { OrganizationProfileImage } from './ShortCard/Organization/OrganizationProfileImage';

function ContactsSectionWrap() {
  return (
    <div className="flex flex-col items-start gap-[16px]">
      {/* Need to change after we get DB */}
      {Specialist ? (
        <SpecialistProfileImage className={'hidden lg:flex'} />
      ) : (
        <OrganizationProfileImage className={'hidden lg:flex'} />
      )}

      <ContactSection>
        <Phone />
        <ContactText>{'+38 (099) 123 45 67'}</ContactText>
      </ContactSection>
      <ContactSection>
        <Mail />
        <ContactText>{'user@gmail.com'}</ContactText>
      </ContactSection>
      <ContactSection>
        <Calendar />
        <ContactText>{'www.website.com'}</ContactText>
      </ContactSection>
      <ContactSection>
        <Clock />
        <ContactText>{'Пн-Пт 9:00-18:00'}</ContactText>
      </ContactSection>
    </div>
  );
}

export { ContactsSectionWrap };
