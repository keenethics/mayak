'use client';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import TherapyInvididual from '@public/images/therapy_individual.svg';
import TherapyKids from '@public/images/therapy_kids.svg';
import TherapyFamily from '@public/images/therapy_family.svg';
import TherapyGroup from '@public/images/therapy_group.svg';
import TherapyPair from '@public/images/therapy_pair.svg';
import TherapyBusiness from '@public/images/therapy_business.svg';
import { OutlinedButton } from './OutlinedButton';
import { Heading, Paragraph } from './Typography';

const therapyData = {
  individual: {
    title: 'Індивідуальна',
    description: 'для тебе',
    image: <TherapyInvididual />,
    link: '/specialist?type=individual',
  },
  kids: {
    title: 'Для дітей і підлітків',
    description: 'для найрідніших',
    image: <TherapyKids />,
    link: '/specialist?type=kids',
  },
  family: {
    title: 'Сімейна',
    description: 'для всієї родини',
    image: <TherapyFamily />,
    link: '/specialist?type=family',
  },
  group: {
    title: 'Групова',
    description: 'для людей з однаковими потребами',
    image: <TherapyGroup />,
    link: '/specialist?type=group',
  },
  pair: {
    title: 'Для пар',
    description: 'для тебе і партнера',
    image: <TherapyPair />,
    link: '/specialist?type=pair',
  },
  business: {
    title: 'Для бізнесу',
    description: 'для співробітників',
    image: <TherapyBusiness />,
    link: '/specialist?type=business',
  },
};

export function TherapyCard({ type }) {
  const router = useRouter();
  const { title, description, image, link } = therapyData[type];

  return (
    <div className="z-[2] flex h-52 w-72 flex-col items-center justify-center gap-2 rounded-[32px] bg-other-white px-4 py-6 lg:h-[330px] lg:w-[410px]">
      <div className="h-11 w-24 lg:h-44 lg:w-[365px]">{image}</div>
      <Heading className="text-center text-h4 font-bold text-primary-700">{title}</Heading>
      <Paragraph className="text-center text-p4 font-bold text-[#FE9E75]">{description}</Paragraph>
      <div>
        <OutlinedButton onClick={() => router.push(link)} className="text-primary-500 text-p4">
          Ознайомитись
        </OutlinedButton>
      </div>
    </div>
  );
}

TherapyCard.propTypes = {
  type: PropTypes.string,
};
