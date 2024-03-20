import { TherapiesSection, FAQSection } from '@components/MainPageSections';
import React from 'react';
import { Map } from '@/app/_components/Map';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,
export const metadata = {
  title: 'Головна сторінка',
  description: 'Пошук психологічної допомоги у м. Львів',
};

export const { REVALIDATION_TIME: revalidate } = env;

export default async function Page() {
  const activeTherapies = await prisma.therapy.findMany({
    where: { isActive: true },
    select: {
      id: true,
      type: true,
      description: true,
      title: true,
      imagePath: true,
    },
    orderBy: { priority: 'desc' },
  });

  const activeFAQs = await prisma.faq.findMany({
    where: { isActive: true },
    select: {
      id: true,
      question: true,
      priority: true,
      answer: true,
    },
    orderBy: { priority: 'asc' },
  });

  return (
    <>
      <div style={{ width: '400px', height: '400px' }}>
        <Map
          points={[
            [51.505, -0.09],
            [51.505, -0.07],
          ]}
          center={[51.505, -0.09]}
          zoom={13}
        />
      </div>
      <section>TBD district & search section</section>
      <TherapiesSection therapies={activeTherapies} />
      <section>TBD goal section</section>
      <FAQSection faqs={activeFAQs} />
    </>
  );
}
