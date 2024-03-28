'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from '@components/CardSpecialist';
import { useListEntries } from '@hooks';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';
import { Slide, Slider } from '@components/Slider';
import { Pagination } from 'swiper/modules';
import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { MapLink } from '@components/MapLink';
import { ShortCardWrapper } from '@components/CardSpecialist/ShortCardWrapper';
import Loading from '@/app/loading';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  const cardStyle = 'max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 lg:mx-auto h-full';
  if (isLoading) return <Loading />;

  if (!isLoading && !data?.data?.length) return null;

  const { data: entries, totalCount } = data;

  return (
    <div className={cn('p-0', className)}>
      <p className="text-p4 font-bold uppercase text-primary-600 md:text-p2">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
      {isMapMode ? (
        <div className="mt-5 lg:grid lg:h-[750px] lg:grid-cols-5 lg:grid-rows-1 lg:gap-2">
          <div
            className={cn(
              'relative grid h-[500px] place-content-center rounded-3xl bg-primary-300 lg:col-span-2 lg:col-start-4 lg:h-full',
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
                640: {
                  slidesPerView: 1.25,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 14,
                },
              }}
              className="mb-10 mt-5 md:mb-12"
            >
              {entries.map(entry => {
                const type = entry.gender ? 'specialist' : 'organization';
                return (
                  <Slide id={entry.id} key={entry.id} className="!h-auto">
                    <ShortCardWrapper data={entry} type={type} className={cardStyle} isHoveredOn={false} />
                  </Slide>
                );
              })}
            </Slider>
          </div>

          <LayoutGroup>
            <motion.ul className="hidden flex-col gap-4 overflow-scroll pr-5 lg:col-span-3 lg:row-start-1 lg:flex">
              {entries.map(entry => {
                const type = entry.gender ? 'specialist' : 'organization';
                return (
                  <motion.li
                    layout="position"
                    transition={{ position: { duration: 0.75, type: 'spring' } }}
                    id={entry.id}
                    key={entry.id}
                    onMouseEnter={() => handleCardHover(entry.id)}
                    onMouseLeave={handleCardLeave}
                  >
                    <ShortCardWrapper
                      data={entry}
                      type={type}
                      className={cardStyle}
                      isHoveredOn={hoveredCardId === entry.id}
                    />
                  </motion.li>
                );
              })}
            </motion.ul>
          </LayoutGroup>
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
      <MapLink
        mapMode={!!isMapMode}
        className={cn('sticky bottom-20 left-[50%] translate-x-[-50%]', { hidden: isMapMode })}
      />
    </div>
  );
}

SpecialistList.propTypes = {
  className: PropTypes.string,
};
