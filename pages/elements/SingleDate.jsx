import React from 'react';
import Moment from 'moment';

const SingleDate = ({ item }) => {
    const formattedDate = item ? Moment(item).format('D MMMM YYYY') : '';
    const formattedTime = item ? Moment(item).format('h:mm A') : '';

    return (
            <div>{formattedDate}, {formattedTime}</div>
    );
};
export default SingleDate;
