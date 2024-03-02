'use client';

import {
  BlueFb,
  BlueInsta,
  BlueLinkedin,
  BlueTikTok,
  BlueYoutube,
  Clock,
  Mail,
  MedAttention,
  MedCare,
  OnlineMeeting,
  Phone,
  Site,
} from '@icons/index';
import { FormatOfWork } from '@prisma/client';
import React from 'react';
import { displayYearsOfExperience } from '@/utils/common';

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

export const borderStyle = 'border-dashed border-t-gray-200';

export const getLabelsList = ({ yearsOfExperience, isFreeReception, formatOfWork }) => [
  {
    id: 'yearsOfExperience',
    icon: <MedCare />,
    content: displayYearsOfExperience(yearsOfExperience),
    color: 'text-other-green',
  },
  {
    id: 'isFreeReception',
    icon: <MedAttention />,
    content: isFreeReception ? 'Безкоштовний прийом' : null,
    color: 'text-other-orange',
  },
  {
    id: 'formatOfWork',
    icon: <OnlineMeeting />,
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
    id: 'Linkedin',
    icon: <BlueLinkedin />,
    href: linkedin,
  },
  {
    id: 'TikTok',
    icon: <BlueTikTok />,
    href: tiktok,
  },
];
