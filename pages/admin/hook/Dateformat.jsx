import React from 'react';
import Moment from 'moment';

const DateComponent = ({ item }) => {
  const formattedDateString = item ? Moment(item).format('D MMMM YYYY') : '';

  return (
    <div>
      {formattedDateString}
    </div>
  );
};

export default DateComponent;