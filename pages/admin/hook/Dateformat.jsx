import React from 'react';
import Moment from 'moment';

const DateComponent = ({ item }) => {
  const formattedDateString = item?.createdAt ? Moment(item.createdAt).format('YYYY-MM-DD') : '';
  const [year, month, day] = formattedDateString.split('-');

  return (
    <div>
      <p>Year: {year}</p>
      <p>Month: {month}</p>
      <p>Day: {day}</p>
    </div>
  );
};

export default DateComponent;
