export const transformDaysOfWork = daysOfWork => {
  const daysOfWorkTransformed = [];
  daysOfWork.forEach(dayOfWork => {
    if (dayOfWork.daysOfWeek) {
      daysOfWorkTransformed.push(
        ...dayOfWork.daysOfWeek.map(dayOfWeek => ({
          dayOfWeek,
          timeRanges: dayOfWork.timeRanges.map(el => el.timeRange),
        })),
      );
    }
  });
  return daysOfWorkTransformed;
};
