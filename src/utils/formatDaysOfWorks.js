import { TIME_RANGE_REGEX } from '@/lib/consts';

const weekLabels = {
  monday: [0, 'пн'],
  tuesday: [1, 'вт'],
  wednesday: [2, 'ср'],
  thursday: [3, 'чт'],
  friday: [4, 'пт'],
  saturday: [5, 'сб'],
  sunday: [6, 'нд'],
};

function getWeekLabelByIndex(index) {
  return Object.values(weekLabels).find(el => el[0] === index)[1];
}

function generateTimeRangeMap(daysOfWork) {
  const timeRangeMap = new Map();
  daysOfWork.forEach(dayOfWork => {
    const validTimeRanges = dayOfWork.timeRanges.filter(el => TIME_RANGE_REGEX.test(el));
    const timeRangeKey = JSON.stringify(validTimeRanges);

    if (timeRangeMap.has(timeRangeKey)) {
      timeRangeMap.get(timeRangeKey).push(dayOfWork.dayOfWeek);
    } else {
      timeRangeMap.set(timeRangeKey, [dayOfWork.dayOfWeek]);
    }
  });
  return timeRangeMap;
}

function formatDaysFromWeekDaysMask(weekDaysMask) {
  if (weekDaysMask.length === 0) return '';
  if (weekDaysMask.length === 1) return getWeekLabelByIndex(weekDaysMask[0]);

  const groups = [];
  let groupStartIndex = weekDaysMask[0];
  let lastIndex = weekDaysMask[0];

  function extractGroup(start, end) {
    if (end - start === 0) {
      groups.push(getWeekLabelByIndex(start));
    } else if (end - start === 1) {
      groups.push(`${getWeekLabelByIndex(start)},${getWeekLabelByIndex(end)}`);
    } else {
      groups.push(`${getWeekLabelByIndex(start)}-${getWeekLabelByIndex(end)}`);
    }
  }

  for (let i = 1; i < weekDaysMask.length; i += 1) {
    if (weekDaysMask[i] - lastIndex > 1) {
      extractGroup(groupStartIndex, lastIndex);
      groupStartIndex = weekDaysMask[i];
    }
    lastIndex = weekDaysMask[i];
  }
  extractGroup(groupStartIndex, lastIndex);
  return groups.join(',');
}

export function formatDaysOfWork(daysOfWork) {
  const timeRangeMap = generateTimeRangeMap(daysOfWork);
  const scheduleTexts = [];
  timeRangeMap.forEach((weekDays, key) => {
    const weekDaysMask = weekDays
      .map(weekDay => weekLabels[weekDay.toLowerCase()]?.[0])
      .filter(el => el !== undefined)
      .sort((a, b) => a - b);
    const formattedDays = formatDaysFromWeekDaysMask(weekDaysMask);
    const timeRanges = JSON.parse(key).join(', ');
    const formattedText = `${formattedDays}: ${timeRanges}`;
    scheduleTexts.push(formattedText);
  });
  return scheduleTexts.join('; ');
}
