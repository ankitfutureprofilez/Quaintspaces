import React from 'react';
import Moment from 'moment';

const SuccessDate = ({ item }) => {
    const formattedDateTimeString = item ? Moment(item).format('D MMMM YYYY, h:mmA') : '';

  return (
    <div>
      {formattedDateTimeString}
    </div>
  );
};

export default SuccessDate;