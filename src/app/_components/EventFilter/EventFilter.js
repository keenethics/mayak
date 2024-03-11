'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckMark } from '@icons/index';
import { cn } from '@/utils/cn';
import { PillButton } from '../PillButton';
import { NoEvents } from '../NoEvents';

export function EventFilter({ events }) {
  const [dates, setDates] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [months, setMonths] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const monthsAhead = 5;
  const monthNames = [
    'січень',
    'лютий',
    'березень',
    'квітень',
    'травень',
    'червень',
    'липень',
    'серпень',
    'вересень',
    'жовтень',
    'листопад',
    'грудень',
  ];

  useEffect(() => {
    const getNextMonths = () => {
      const nextMonths = [];
      for (let i = 0; i <= monthsAhead; i++) {
        const nextMonthIndex = (currentMonth + i - 1) % 12; // Ensure month index doesn't exceed 12
        const nextMonthName = monthNames[nextMonthIndex];
        nextMonths.push(nextMonthName);
      }
      return nextMonths;
    };

    const nextMonths = getNextMonths();
    setMonths(nextMonths);
    // eslint-disable-next-line
  }, [currentMonth]);

  useEffect(() => {
    // Filter out dates for this year and not before today

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
      date => new Date(date.eventDate).toLocaleString('uk-UA', { month: 'long' }) === month,
    );
    setFilteredDates(filtered);

    setActiveIndex(index);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch lg:w-[900px]">
      <div className="flex flex-row flex-wrap items-start justify-start gap-3">
        {months.map((month, index) => (
          <PillButton
            variant="outlined"
            colorVariant="orange"
            className={cn(
              activeIndex === index &&
                'flex-row gap-1 border-gray-700 bg-secondary-300 align-middle text-secondary-500',
            )}
            key={index}
            onClick={() => {
              handleFilter(index, month);
            }}
            icon={activeIndex === index && <CheckMark className="h-4 w-4" />}
          >
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </PillButton>
        ))}
      </div>

      <ul
        className="grid w-full
           self-stretch sm:grid-cols-1 md:grid-cols-2 md:gap-[12px] lg:grid-cols-3 lg:gap-[16px]"
      >
        {filteredDates.length === 0 ? (
          <NoEvents />
        ) : (
          filteredDates
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
            ))
        )}
      </ul>
    </div>
  );
}

EventFilter.propTypes = {
  events: PropTypes.array,
};
