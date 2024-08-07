import React from 'react';
import Moment from 'moment';

const DateComponent = ({ item }) => {
  const formattedDate = item ? Moment(item).format('D MMMM YYYY') : '';
  const formattedTime = item ? Moment(item).format('h:mmA') : '';

  return (
    <div>
      <div>{formattedDate}</div>
      <div>{formattedTime}</div>
    </div>
  );
};
export default DateComponent;
