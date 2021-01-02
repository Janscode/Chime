import React from 'react';
import './LastModified.scss';
import PropTypes from 'prop-types';

function LastModified(props) {
  const oneHour = 1000 * 60 * 60;
  const now = new Date();
  const then = new Date(props.update);
  const start = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const end = Date.UTC(then.getFullYear(), then.getMonth(), then.getDate());

  const numHours = Math.round(Math.abs(start - end) / oneHour);

  let timeString;

  if (numHours === 0) {
    timeString = `now`;
  } else if (numHours < 24) {
    timeString = `${numHours} hours ago`;
  } else if (numHours / 24 < 7) {
    timeString = `${Math.round(numHours / 24)} days ago`;
  } else {
    timeString = `${Math.round(numHours / 24 / 7)} weeks ago`;
  }

  return (
    <span className="last-modified__text">
      { `${props.active ? 'updated' : 'closed'} `}
      { timeString }
      <span
        className="circle"
        style={
          props.active ? {backgroundColor: '#2ECC40'} : {backgroundColor: '#FF4136'}
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
