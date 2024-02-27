'use client';

import {
  Clock,
  Mail,
  MedAttention,
  MedCare,
  OnlineMeeting,
  Phone,
  Site,
  BlueFb,
  BlueInsta,
  BlueTikTok,
  BlueYoutube,
  BlueLinkedin,
} from '@icons/index';
import { FormatOfWork } from '@prisma/client';
import React from 'react';
import { displayYearsOfExperience } from '@/utils/common';
import { cn } from '@/utils/cn';

export const getContactsList = ({ phone, email, website }) => [
  {
    id: 'phone',
    icon: <Phone />,
    content: phone,
    href: null,
  },
  {
    id: 'email',
    icon: <Mail />,
    content: email,
    href: null,
  },
  {
    id: 'website',
    icon: <Site />,
    content: website,
    href: website,
    className: 'text-primary-300',
  },
  {
    id: 'schedule',
    icon: <Clock />,
    content: ['пн-пт 9:00-18:00', 'ср-чт 18:00-20:00', 'ср-чт 08:00-13:00'],
    href: null,
  },
];

const iconStyle = 'h-[15px] w-[15px] lg:h-[20px] lg:w-[20px]';

export const getLabelsList = ({ yearsOfExperience, isFreeReception, formatOfWork }) => [
  {
    id: 'yearsOfExperience',
    icon: <MedCare className={cn(iconStyle)} />,
    content: displayYearsOfExperience(yearsOfExperience),
    color: 'text-other-green',
  },
  {
    id: 'isFreeReception',
    icon: <MedAttention className={cn(iconStyle)} />,
    content: isFreeReception ? 'Безкоштовний прийом' : null,
    color: 'text-other-orange',
  },
  {
    id: 'formatOfWork',
    icon: <OnlineMeeting className={cn(iconStyle)} />,
    content: formatOfWork === FormatOfWork.ONLINE ? 'Онлайн консультації' : null,
    color: 'text-other-blue',
  },
];

export const getSpecialistSocials = ({ instagram, facebook, tiktok, youtube, linkedin }) => [
  {
    id: 'Instagram',
    icon: <BlueInsta />,
    href: instagram,
  },
  {
    id: 'Facebook',
    icon: <BlueFb />,
    href: facebook,
  },
  {
    id: 'Youtube',
    icon: <BlueYoutube />,
    href: youtube,
  },
  {
    id: 'Linkdin',
    icon: <BlueLinkedin />,
    href: linkedin,
  },
  {
    id: 'TikTok',
    icon: <BlueTikTok />,
    href: tiktok,
  },
];
