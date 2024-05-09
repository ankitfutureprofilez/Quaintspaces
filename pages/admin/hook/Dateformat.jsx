import React from 'react';
import Moment from 'moment';

const DateComponent = ( item ) => {
  const formattedDateString = item ? Moment(item).format('YYYY-MMM-DD') : '';
  const [year, month, day] = formattedDateString.split('-');

  return (
    <div>
      {day}&nbsp;
      {month}&nbsp;
   {year}
    </div>
  );
};

export default DateComponent;


