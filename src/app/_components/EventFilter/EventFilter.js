'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import { PillButton } from '../PillButton';

export function EventFilter({ events }) {
  const [dates, setDates] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [months, setMonths] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Filter out dates for this year and not before today
    const currentYear = new Date().getFullYear();
    const filteredData = events
      .filter(item => {
        const eventYear = item.eventDate.getFullYear();
        return eventYear <= currentYear;
      })
      .toSorted((a, b) => a.eventDate - b.eventDate)
      .filter(date => date.eventDate >= new Date());

    setDates(filteredData);
    // eslint-disable-next-line
  }, []);

  //   const getDate = events
  //     .map(({ eventDate }) => eventDate)
  //     .toSorted((a, b) => a - b)
  //     .toLocaleString('uk-UA', {
  //       timeZone: 'UTC',
  //       hour: 'numeric',
  //       minute: '2-digit',
  //       day: 'numeric',
  //       month: 'long',
  //       year: 'numeric',
  //     });

  useEffect(() => {
    // Extract unique month names from dates
    const uniqueMonths = dates.map(date => new Date(date.eventDate).toLocaleString('uk-UA', { month: 'long' }));
    setMonths(uniqueMonths);
  }, [dates]);

  useEffect(() => {
    // Filter data for the first month initially
    const firstMonth = months[0];
    const filtered = dates.filter(
      date => new Date(date.eventDate).toLocaleString('uk-UA', { month: 'long' }) === firstMonth,
    );
    setFilteredDates(filtered);
  }, [dates, months]);

  const handleFilter = (index, month) => {
    // Filter data based on selected month
    const filtered = dates.filter(
      date => new Date(date.eventDate).toLocaleString('default', { month: 'long' }) === month,
    );
    setFilteredDates(filtered);

    setActiveIndex(index);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch  lg:w-[900px]">
      <div className="flex flex-row flex-wrap items-start justify-start gap-3">
        {months.slice(0, 6).map((month, index) => (
          <PillButton
            variant="outlined"
            colorVariant="orange"
            className={cn(activeIndex === index && 'border-gray-700 bg-secondary-300 text-secondary-500')}
            key={index}
            onClick={() => {
              handleFilter(index, month);
            }}
          >
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </PillButton>
        ))}
      </div>

      <ul
        className="grid w-full
           self-stretch sm:grid-cols-1 md:grid-cols-2 md:gap-[12px] lg:grid-cols-3 lg:gap-[16px]"
      >
        {filteredDates
          .filter(date => date.eventDate >= new Date())
          .map((date, index) => (
            <li key={index}>
              {new Date(date.eventDate).toLocaleString('uk-UA', {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: '2-digit',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </li>
          ))}
      </ul>
    </div>
  );
}

EventFilter.propTypes = {
  events: PropTypes.array,
};
