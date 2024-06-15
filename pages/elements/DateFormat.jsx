import React from 'react';
import Moment from 'moment';

const DateComponent = ({ item }) => {
  const formattedDateTimeString = item ? Moment(item).format('D MMMM YYYY, h:mm A') : '';

  return (
    <div>
      {formattedDateTimeString}
    </div>
  );
};

export default DateComponent;