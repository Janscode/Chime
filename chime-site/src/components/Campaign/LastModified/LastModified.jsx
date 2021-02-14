import React from 'react';
import './LastModified.scss';
import PropTypes from 'prop-types';

function LastModified({ active, update }) {
  const oneMinute = 1000 * 60;
  const now = new Date();
  const then = new Date(update);
  const start = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
  );
  const end = Date.UTC(
      then.getFullYear(),
      then.getMonth(),
      then.getDate(),
      then.getHours(),
      then.getMinutes(),
  );

  const numMinutes = Math.round(Math.abs(start - end) / oneMinute);

  let timeString;

  if (numMinutes === 0) {
    timeString = `now`;
  } else if (numMinutes < 60) {
    timeString = `${numMinutes} minutes ago`;
  } else if (numMinutes / 60 < 24) {
    timeString = `${Math.round(numMinutes / 60)} hours ago`;
  } else if (numMinutes / (24 * 60) < 7) {
    timeString = `${Math.round(numMinutes / (24 * 60))} days ago`;
  } else {
    timeString = `${Math.round(numMinutes / (24 * 60 * 7))} weeks ago`;
  }

  return (
    <span className="last-modified__text">
      { `${active ? 'updated' : 'closed'} `}
      { timeString }
      <span
        className="circle"
        style={
          active ?
            { backgroundColor: '#2ECC40' } :
            { backgroundColor: '#FF4136' }
        }
      ></span>
    </span>
  );
}

LastModified.propTypes = {
  active: PropTypes.bool.isRequired,
  update: PropTypes.string.isRequired,
};

export default LastModified;
