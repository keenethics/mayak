'use client';

import CalendarIcon from '@icons/calendarFilled.svg';
import PriceIcon from '@icons/priceFilled.svg';
import LocationIcon from '@icons/locationFilled.svg';
import TimeIcon from '@icons/timeFilled.svg';
import PropTypes from 'prop-types';
import { Label } from '../Label';
import { cn } from '@/utils/cn';

const months = {
  0: 'січня',
  1: 'лютого',
  2: 'березня',
  3: 'квітня',
  4: 'травня',
  5: 'червня',
  6: 'липня',
  7: 'серпня',
  8: 'вересня',
  9: 'жовтня',
  10: 'листопада',
  11: 'грудня',
};

const weekDays = {
  0: 'неділя',
  1: 'понеділок',
  2: 'вівторок',
  3: 'середа',
  4: 'четвер',
  5: "п'ятниця",
  6: 'субота',
};

function ListItem({ icon, text, textColor, fontWeight }) {
  return (
    <li className="flex gap-2">
      {icon}
      <p className={cn('text-p3', textColor, fontWeight)}>{text}</p>
    </li>
  );
}

function transformData(event) {
  const { title, organizerName, tags, priceType, eventDate, format, address, price } = event;
  const date = new Date(eventDate);
  const dateText = `${date.getDate()} ${months[date.getMonth()]}, ${weekDays[date.getDay()]}`;
  const timeText = `${date.getHours()}:${date.getMinutes(0)}`;
  const locationText = format === 'ONLINE' ? 'Онлайн' : address;
  let priceText;
  switch (priceType) {
  case 'FREE':
    priceText = 'Безкоштовно';
    break;
  case 'MIN_PRICE':
    priceText = `від ${price}`;
    break;
  case 'FIXED_PRICE':
    priceText = `${price}`;
    break;
  default:
    break;
  }
  return { title, organizerName, tags, priceText, locationText, dateText, timeText };
}

export default function EventCard({ event }) {
  const { title, organizerName, tags, priceText, locationText, dateText, timeText } = transformData(event);
  const tagsElements = tags.map(tag => (
    <Label key={tag.name} bgColor="bg-primary-100" textColor="text-primary-600" text={tag.name} />
  ));
  return (
    <div className="flex w-max flex-col gap-4 rounded-3xl border-2 border-gray-200 bg-other-white p-4">
      <div className="flex w-[259px] flex-col items-start gap-1">
        <p className="text-p1 font-bold text-gray-700 underline">{title}</p>
        <p className="text-p3 font-bold text-primary-600">{organizerName}</p>
      </div>
      <div className="flex w-64 items-start gap-4 overflow-hidden">{tagsElements}</div>
      <hr className="border border-dashed border-gray-300" />
      <ul className="flex flex-col gap-4">
        <ListItem icon={<CalendarIcon />} textColor="text-secondary-400" fontWeight="font-bold" text={dateText} />
        <ListItem icon={<TimeIcon />} textColor="text-gray-700" fontWeight="font-medium" text={timeText} />
        <ListItem icon={<PriceIcon />} textColor="text-gray-700" fontWeight="font-medium" text={priceText} />
        <ListItem icon={<LocationIcon />} textColor="text-gray-700" fontWeight="font-medium" text={locationText} />
      </ul>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};

ListItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
};
