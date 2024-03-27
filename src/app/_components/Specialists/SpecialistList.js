'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardOrganization,
  CardOrganizationShort,
  CardSpecialist,
  CardSpecialistShort,
} from '@components/CardSpecialist';
import { useListEntries } from '@hooks';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';
import { Slider } from '@components/Slider';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { cn } from '@utils/cn';
import { MapLink } from '@components/MapLink';
import Loading from '@/app/loading';

function getProperEnding(count) {
  const lastDigit = count % 10;
  if (_.range(11, 15).includes(count)) {
    return 'результатів';
  }
  if (_.range(2, 5).includes(lastDigit)) {
    return 'результати';
  }
  if (lastDigit === 1) {
    return 'результат';
  }
  return 'результатів';
}

export function SpecialistList({ className }) {
  const searchParams = useSearchParams();

  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleCardHover = id => {
    setHoveredCardId(id);
  };

  const handleCardLeave = () => {
    setHoveredCardId(null);
  };

  const isMapMode = searchParams.get('mode') === 'map';

  const { data, isLoading } = useListEntries(searchParams.toString());
  const cardStyle = 'max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 lg:mx-auto !h-full';
  if (isLoading) return <Loading />;

  if (!isLoading && !data?.data?.length) return null;

  const { data: entries, totalCount } = data;

  return (
    <div className={cn('p-0', className)}>
      <MapLink mapMode={!!isMapMode} className={cn({ hidden: isMapMode })} />
      <p className="text-p4 font-bold uppercase text-primary-600 md:text-p2">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
      {isMapMode ? (
        <div className="mt-5 lg:grid lg:h-[750px] lg:grid-cols-5 lg:grid-rows-1 lg:gap-2">
          <div
            className={cn(
              'relative grid h-[500px] place-content-center bg-primary-300 lg:col-span-2 lg:col-start-4 lg:h-full',
              {
                hidden: !isMapMode,
              },
            )}
          >
            <span>Map</span>
            <MapLink mapMode={!!isMapMode} className="absolute bottom-auto left-3 top-3 translate-x-0" />
          </div>
          <div className="block lg:hidden">
            <Slider
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                540: {
                  slidesPerView: 1.4,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 14,
                },
              }}
              className="my-5"
            >
              {entries.map(entry => (
                <SwiperSlide id={entry.id} key={entry.id} className="!h-auto">
                  {entry.gender ? (
                    <CardSpecialistShort className={cardStyle} specialist={entry} />
                  ) : (
                    <CardOrganizationShort className={cardStyle} organization={entry} />
                  )}
                </SwiperSlide>
              ))}
            </Slider>
          </div>

          <ul className="hidden flex-col gap-4 overflow-scroll pr-5 lg:col-span-3 lg:row-start-1 lg:flex">
            {entries.map(entry => (
              <li
                id={entry.id}
                key={entry.id}
                onMouseEnter={() => handleCardHover(entry.id)}
                onMouseLeave={handleCardLeave}
              >
                {entry.gender ? (
                  <CardSpecialistShort
                    className={cardStyle}
                    specialist={entry}
                    isHoveredOn={hoveredCardId === entry.id}
                  />
                ) : (
                  <CardOrganizationShort
                    className={cardStyle}
                    organization={entry}
                    isHoveredOn={hoveredCardId === entry.id}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={cn('flex flex-col gap-6', className)}>
          {entries.map(entry => (
            <li id={entry.id} key={entry.id}>
              {entry.gender ? (
                <CardSpecialist className={cardStyle} specialist={entry} />
              ) : (
                <CardOrganization className={cardStyle} organization={entry} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SpecialistList.propTypes = {
  className: PropTypes.string,
};
