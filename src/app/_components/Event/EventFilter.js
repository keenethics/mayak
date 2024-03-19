'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import CheckMark from '@icons/check-mark.svg';
import Search from '@icons/search.svg';
import { allEvents, useEventSetParam } from '@hooks';
import { cn } from '@/utils/cn';
import { PillButton } from '../PillButton';
import { buttonColorVariant } from '../PillButton/style';
import { NoInfoToShow } from '../NoInfoToShow';
import { EventCard } from './Card';
import { monthsAhead, monthNames } from './config';

export function EventFilter() {
  const [months, setMonths] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [activeMonthNumber, setActiveMonthNumber] = useState('');
  const [hoveredIndexes, setHoveredIndexes] = useState(new Array(months.length));

  const currentMonth = new Date().getMonth() + 1;

  const searchParams = useSearchParams();
  const { addParam, deleteParam } = useEventSetParam('month');

  const { ref, inView } = useInView();

  const { semiorange } = buttonColorVariant.eventFilter;

  const activeButtonStyles = cn({
    'pointer-events-none border-secondary-300 bg-secondary-300 font-semibold text-gray-900': semiorange.active,
  });

  function selectButtonIcon(index) {
    if (activeIndex === index && semiorange.active) {
      return <CheckMark key={`checkmark+${index}`} className="h-4 w-4 transition-all" />;
    }
    if (hoveredIndexes[index] && activeIndex !== index && (semiorange.hover || semiorange.focused)) {
      return <Search key={`searchicon+${index}`} className="h-4 w-4 transition-all " />;
    }
    return null;
  }

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

  // Fetch data and pass url params
  const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery({
    queryFn: ({ month = activeMonthNumber, pageParam = '' }) => allEvents({ month, take: 6, lastCursor: pageParam }),
    queryKey: ['event', activeMonthNumber],
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });

  // Get data on first render or on url open
  useEffect(() => {
    const monthFromQuery = searchParams.get('month');

    if (monthFromQuery && monthFromQuery !== currentMonth) {
      // If the month is defined in the query and is not equal to the current month
      setActiveMonthNumber(monthFromQuery);
      setActiveIndex(monthFromQuery - 1);
      setActiveMonth(months.filter(item => item.index === parseInt(monthFromQuery, 10)));
      allEvents({ month: monthFromQuery, take: '', lastCursor: '' });
    } else if (!monthFromQuery || monthFromQuery === undefined) {
      setActiveMonth(months[0]);
      setActiveMonthNumber(currentMonth);
      setActiveIndex(currentMonth - 1);
      deleteParam();
      addParam(currentMonth.toString());
      allEvents({ month: currentMonth, take: '', lastCursor: '' });
    }

    // eslint-disable-next-line
  }, [currentMonth]);

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [hasNextPage, inView]);

  // // Filter data based on selected month
  const handleFilter = newMonth => {
    setActiveIndex(newMonth.index);
    setActiveMonth(newMonth);
    const calcMonth = parseInt(newMonth.index + 1, 10);
    setActiveMonthNumber(calcMonth);
    deleteParam();
    addParam(calcMonth);
    allEvents({ month: calcMonth, take: '', lastCursor: '' });
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

  if (error) return <div className="mt-10">{('An error has occurred: ', error.message)}</div>;

  return (
    <>
      <div className="lg:w-max-[900px] mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch">
        <div className="flex flex-row flex-wrap items-start justify-start gap-3">
          {months.map(month => (
            <PillButton
              variant="eventFilter"
              colorVariant="semiorange"
              className={cn(activeIndex === month.index && activeButtonStyles, 'group w-fit')}
              key={month.index}
              activemonth={activeMonth}
              onMouseEnter={() => handleMouseEnter(month.index)}
              onMouseLeave={() => handleMouseLeave(month.index)}
              onFocus={() => {
                handleMouseEnter(month.index);
              }}
              onBlur={() => handleMouseLeave(month.index)}
              onMouseDown={() => handleMouseEnter(month.index)}
              onMouseUp={() => handleMouseLeave(month.index)}
              onClick={() => {
                handleFilter(month);
                handleMouseLeave(month.index);
              }}
              icon={selectButtonIcon(month.index)}
            >
              {month.name.charAt(0).toUpperCase() + month.name.slice(1)}
            </PillButton>
          ))}
        </div>

        <ul className="grid w-full gap-4 self-stretch sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

      {(isLoading || isFetchingNextPage) && <CircularProgress />}

      {isSuccess && data?.pages.length === 1 && <NoInfoToShow text="подій" />}
    </>
  );
}
