import React from 'react';
import PropTypes from 'prop-types';
import { formatDaysOfWork } from '@/utils/formatDaysOfWorks';

export function DaysOfWorkList({ rawDaysOfWork }) {
  if (!rawDaysOfWork) return null;
  return formatDaysOfWork(rawDaysOfWork).map((line, i) => <p key={i}>{line}</p>);
}
DaysOfWorkList.propTypes = {
  rawDaysOfWork: PropTypes.array,
};
