'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { CheckMark } from '@icons/index';
import { cn } from '@/utils/cn';
import { PillButton } from '../PillButton';
import { NoInfoToShow } from '../NoInfoToShow';
import { EventCard } from './Card';

export function EventFilter({ events }) {
  const router = useRouter();

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

  // Get 6 basic month starting from today
  useEffect(() => {
    const getNextMonths = () => {
      const nextMonths = [];
      // no-plusplus rule for eslint
      for (let i = 0; i <= monthsAhead; i += 1) {
        const nextMonthIndex = (currentMonth + i - 1) % 12;
        const nextMonthName = monthNames[nextMonthIndex];
        nextMonths.push(nextMonthName);
      }
      return nextMonths;
    };

    const nextMonths = getNextMonths();
    setMonths(nextMonths);
    // eslint-disable-next-line
  }, [currentMonth]);

  // Filter out dates for this year and not before today
  useEffect(() => {
    const filteredData = events
      .filter(item => {
        const eventYear = item.eventDate.getFullYear();
        return eventYear <= currentYear;
      })
      .toSorted((a, b) => a.eventDate - b.eventDate)
      .filter(date => date.isActive && date.eventDate >= new Date());

    setDates(filteredData);
    // eslint-disable-next-line
  }, []);

  // Get the month from the query parameters or use the first month from array and fetch data
  useEffect(() => {
    router.push(
      `/events?month=${months[0]}`,

      undefined,
      { shallow: true },
    );
    const filtered = dates.filter(
      date => new Date(date.eventDate).toLocaleString('uk-UA', { month: 'long' }) === months[0],
    );
    setFilteredDates(filtered);
  }, [router, months, dates]);

  // Filter data based on selected month
  const handleFilter = useCallback(
    (index, month) => {
      const filtered = dates.filter(
        date => new Date(date.eventDate).toLocaleString('uk-UA', { month: 'long' }) === month,
      );
      setFilteredDates(filtered);
      setActiveIndex(index);

      if (currentMonth === month) {
        router.push(`/events?month=${months[0]}`, undefined, { shallow: true });
      } else {
        router.push(
          `/events?month=${month}`,

          undefined,
          { shallow: true },
        );
      }

      // router.push(`/events?month=${month}`);
    },
    [router, dates, months, currentMonth],
  );

  return (
    <div className="mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch lg:w-[900px]">
      <div className="flex flex-row flex-wrap items-start justify-start gap-3">
        {months.map((month, index) => (
          <PillButton
            variant="eventFilter"
            colorVariant="semiorange"
            className={cn(activeIndex === index && 'border-secondary-300 bg-secondary-300 text-gray-900')}
            key={month}
            onClick={() => {
              handleFilter(index, month);
            }}
            icon={activeIndex === index && <CheckMark className="h-4 w-4" />}
          >
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </PillButton>
        ))}
      </div>
      {filteredDates.length === 0 && <NoInfoToShow text="подій" />}
      <ul
        className="grid w-full
           gap-6 self-stretch sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredDates
          .filter(date => date.eventDate >= new Date())
          .map((date, index) => (
            <EventCard key={index} event={date} />
          ))}
      </ul>
    </div>
  );
}

EventFilter.propTypes = {
  events: PropTypes.array,
};
