'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import CheckMark from '@icons/check-mark.svg';
import Search from '@icons/search.svg';
import { allEvents, useEventSetParam } from '@hooks';
import { EventCard } from '@components/Event/Card';
import { PillButton } from '@components/PillButton';
import { buttonColorVariant } from '@components/PillButton/style';
import { NoInfoToShow } from '@components/NoInfoToShow';
import { cn } from '@/utils/cn';

const currentMonth = new Date().getMonth() + 1;

const monthNames = [
  { index: 0, name: 'січень', en: 'january' },
  { index: 1, name: 'лютий', en: 'february' },
  { index: 2, name: 'березень', en: 'march' },
  { index: 3, name: 'квітень', en: 'april' },
  { index: 4, name: 'травень', en: 'may' },
  { index: 5, name: 'червень', en: 'june' },
  { index: 6, name: 'липень', en: 'july' },
  { index: 7, name: 'серпень', en: 'august' },
  { index: 8, name: 'вересень', en: 'september' },
  { index: 9, name: 'жовтень', en: 'october' },
  { index: 10, name: 'листопад', en: 'november' },
  { index: 11, name: 'грудень', en: 'december' },
];

const calcPureMonthIndex = parseInt(currentMonth - 1, 10);
const firstMonth = monthNames.slice(calcPureMonthIndex, calcPureMonthIndex + 1);
const restMonth = monthNames.slice(calcPureMonthIndex + 1, calcPureMonthIndex + 6);
const filteredMonths = firstMonth.concat(restMonth);

export function EventSection() {
  const [activeMonth, setActiveMonth] = useState(parseInt(filteredMonths[0].index + 1, 10));

  const searchParams = useSearchParams();
  const { addParam, deleteParam } = useEventSetParam('month');

  const { ref, inView } = useInView();

  const { semiorange } = buttonColorVariant.eventFilter;

  const activeButtonStyles = cn({
    'pointer-events-none border-secondary-300 bg-secondary-300 font-semibold text-gray-900': semiorange.active,
  });

  function selectButtonIcon(index) {
    if (activeMonth - 1 === index) {
      return (
        <CheckMark
          key={`checkmark+${index}`}
          className={cn(`block h-4 w-4 transition-all group-hover:hidden group-focus:hidden`)}
        />
      );
    }

    return (
      <Search
        key={`searchicon+${index}`}
        className="hidden h-4 w-4 transition-all group-hover:block group-focus:block"
      />
    );
  }

  // Fetch data and pass url params
  const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery({
    queryFn: ({ month = activeMonth, pageParam = '' }) => allEvents({ month, take: 6, lastCursor: pageParam }),
    queryKey: ['event', activeMonth],
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });

  // Get data on first render or on url open
  useEffect(() => {
    const monthFromQuery = searchParams.get('month');

    if (monthFromQuery && monthFromQuery !== currentMonth) {
      // If the month is defined in the query and is not equal to the current month
      setActiveMonth(monthFromQuery);
      deleteParam();
      addParam(monthFromQuery);
    } else if (!monthFromQuery || monthFromQuery === undefined) {
      setActiveMonth(currentMonth);
      deleteParam();
      addParam(currentMonth);
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

  // Filter data based on selected month
  const handleFilter = newMonth => {
    setActiveMonth(newMonth);
    deleteParam();
    addParam(newMonth.toString());
  };

  return (
    <>
      <div className="lg:w-max-[900px] mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch">
        <div className="flex flex-row flex-wrap items-start justify-start gap-3">
          {filteredMonths.map(month => (
            <PillButton
              variant="eventFilter"
              colorVariant="semiorange"
              className={cn(activeMonth - 1 === month.index && activeButtonStyles, 'group w-fit')}
              key={month.index}
              onClick={() => {
                handleFilter(month.index + 1);
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

      {error && <div className="mt-10">{('An error has occurred: ', error.message)}</div>}
    </>
  );
}
