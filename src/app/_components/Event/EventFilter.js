'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import ky from 'ky';
import CheckMark from '@icons/check-mark.svg';
import Search from '@icons/search.svg';
import { cn } from '@/utils/cn';
import { PillButton } from '../PillButton';
import { NoInfoToShow } from '../NoInfoToShow';
import { buttonColorVariant } from '../PillButton/style';
import { EventCard } from './Card';

export function EventFilter() {
  const [months, setMonths] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [activeMonthNumber, setActiveMonthNumber] = useState('');
  const [hoveredIndexes, setHoveredIndexes] = useState(new Array(months.length));

  const currentMonth = new Date().getMonth() + 1;
  const { ref, inView } = useInView();

  const allEvents = async ({ take, lastCursor, month }) => {
    const queryParams = new URLSearchParams({ take, lastCursor, month }).toString();
    return await ky(`/api/event?${queryParams}`).json();
  };

  // fetch data and pass url params
  const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery({
    queryFn: ({ month = activeMonthNumber, pageParam = '' }) => allEvents({ month, take: 3, lastCursor: pageParam }),
    queryKey: ['event', activeMonthNumber],
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });

  // console.log('data on page', data);
  // console.log('activeMonth', activeMonth.index);

  const monthsAhead = 5;
  const monthNames = [
    { index: 0, name: 'січень' },
    { index: 1, name: 'лютий' },
    { index: 2, name: 'березень' },
    { index: 3, name: 'квітень' },
    { index: 4, name: 'травень' },
    { index: 5, name: 'червень' },
    { index: 6, name: 'липень' },
    { index: 7, name: 'серпень' },
    { index: 8, name: 'вересень' },
    { index: 9, name: 'жовтень' },
    { index: 10, name: 'листопад' },
    { index: 11, name: 'грудень' },
  ];

  // Get 6 basic month names for filters, starting from current month
  useEffect(() => {
    const getNextMonths = () => {
      const nextMonths = [];
      for (let i = 0; i <= monthsAhead; i += 1) {
        const nextMonthIndex = (currentMonth + i - 1) % 12;
        const nextMonthName = monthNames[nextMonthIndex];
        setActiveMonthNumber(monthNames[i] === currentMonth ? monthNames[i] : '');
        nextMonths.push(nextMonthName);
      }
      return nextMonths;
    };
    const nextMonths = getNextMonths();
    setMonths(nextMonths);
    // eslint-disable-next-line
  }, [currentMonth]);

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage, data]);

  if (error) return <div className="mt-10">{('An error has occurred: ', error.message)}</div>;

  // // Filter data based on selected month
  const handleFilter = newMonth => {
    setActiveIndex(newMonth.index);
    setActiveMonth(newMonth);
    setActiveMonthNumber(newMonth.index + 1);
  };

  const handleMouseEnter = index => {
    const newHoveredIndexes = [...hoveredIndexes];
    newHoveredIndexes[index] = true;
    setHoveredIndexes(newHoveredIndexes);
  };

  const handleMouseLeave = index => {
    const newHoveredIndexes = [...hoveredIndexes];
    newHoveredIndexes[index] = false;
    setHoveredIndexes(newHoveredIndexes);
  };

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch lg:w-[900px]">
        <div className="flex flex-row flex-wrap items-start justify-start gap-3">
          {months.map(month => (
            <PillButton
              variant="eventFilter"
              colorVariant="semiorange"
              // className={cn(activeIndex === index && buttonColorVariant.eventFilter.semiorange.active)}
              className={cn(
                activeIndex === month.index && 'active' && buttonColorVariant.eventFilter.semiorange.active,
              )}
              // className={cn(activeIndex === index && buttonColorVariant.eventFilter.semiorange.active)}
              // active={activeIndex === index && buttonColorVariant.eventFilter.semiorange.active}
              active={activeIndex === month.index ? `${buttonColorVariant.eventFilter.semiorange.active}` : ''}
              key={month.index}
              onMouseEnter={() => handleMouseEnter(month.index)}
              onMouseLeave={() => handleMouseLeave(month.index)}
              onFocus={() => handleMouseEnter(month.index)}
              onBlur={() => handleMouseLeave(month.index)}
              onMouseDown={() => handleMouseEnter(month.index)}
              onMouseUp={() => handleMouseLeave(month.index)}
              onClick={() => {
                handleFilter(month);
              }}
              icon={[
                activeIndex === month.index && (
                  <CheckMark key={`checkmark+${month.index}`} className={cn('h-4 w-4 transition-all')} />
                ),

                hoveredIndexes[month.index] &&
                  activeIndex !== month.index &&
                  (buttonColorVariant.eventFilter.semiorange.hover ||
                    buttonColorVariant.eventFilter.semiorange.focused) && (
                    <Search key={`searchicon+${month.index}`} className="h-4 w-4 transition-all" />
                  ),
              ]}
            >
              {month.name.charAt(0).toUpperCase() + month.name.slice(1)}
            </PillButton>
          ))}
        </div>

        <ul
          className="grid w-full
           gap-6 self-stretch sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {isSuccess &&
            data?.pages.map(page =>
              page.data.map((event, index) => {
                if (page.data.length === index + 1)
                  return (
                    <div ref={ref} key={event.id}>
                      <EventCard event={event} />
                    </div>
                  );

                return <EventCard key={event.id} event={event} />;
              }),
            )}
        </ul>
      </div>
      {(isLoading || isFetchingNextPage) && <p className="mb-4">Loading...</p>}
      {data?.pages.length === 0 && <NoInfoToShow text="подій" />}
    </>
  );
}

EventFilter.propTypes = {
  events: PropTypes.array,
};
