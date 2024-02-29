import React from 'react';
import { prisma } from '@/lib/db';
import { NoEvents } from '../_components/NoEvents';
import { Heading, PillButton } from '../_components';
import { buttonColorVariant, buttonType } from '../_components/PillButton/style';

export const metadata = {
  title: 'Події',
  description: 'Опис сторінки подій',
};

export default async function Page() {
  const events = await prisma.event.findMany();
  //   console.log(events);
  return (
    <div className="flex flex-col items-center justify-center self-stretch sm:px-[16px] sm:py-[24px] md:px-[40px] md:py-[30px] lg:px-[80px] lg:pb-[80px] lg:pt-[64px]">
      <div className="mx-auto flex w-full flex-col items-start justify-start gap-[24px] self-stretch  lg:w-[900px]">
        <Heading type="h3" className="text-h3 text-primary-800">
          Події
        </Heading>
        <p type="c2" className=" uppercase text-primary-600">
          найближчі місяці
        </p>
        <ul className="flex flex-row flex-wrap items-start justify-start gap-[12px]">
          <li>
            <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.blue}>
              june
            </PillButton>
          </li>

          <li>
            <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.blue}>
              july
            </PillButton>
          </li>

          <li>
            <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.blue}>
              august
            </PillButton>
          </li>

          <li>
            <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.blue}>
              september
            </PillButton>
          </li>

          <li>
            <PillButton type={buttonType.outlined} colorVariant={buttonColorVariant.outlined.blue}>
              october
            </PillButton>
          </li>
        </ul>

        {/* <NoEvents /> */}
        {events.length === 0 ? (
          <NoEvents />
        ) : (
          <ul className="grid w-full self-stretch sm:grid-cols-1 md:grid-cols-2 md:gap-[12px] lg:grid-cols-3 lg:gap-[16px]">
            {events?.map(({ id, title }) => (
              <li key={id}>title: {title}</li>
            ))}
          </ul>
        )}

        {/* {events.map((item, idx) => (
        <div key={idx}>
          <p>id: {item.id}</p>
          <p>title: {item.title}</p>
          <p>organizer: {item.organizerName}</p>
          <p>notes: {item.notes}</p>
          <p>address: {item.address}</p>
          <p>location: {item.locationLink}</p>
          <p>price: {item.price}</p>
          <p>active: {item.isActive}</p>
          <p> eventDate: {item.eventDate}</p>
          <p> format: {item.format}</p>
        </div>
      ))} */}
      </div>
    </div>
  );
}
