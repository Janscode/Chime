import React from 'react';
import './QuestionDataItem.scss';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

function QuestionDataItem(props) {
  const frequency = (props.selections / props.responses) * 100;
  const color = '#f5f5f5';
  return (
    <Container
      className={`question-data-item d-flex ${props.className}`}
      fluid
    >
      <div
        className="question-data-item__chart"
        style={{
          // eslint-disable-next-line
          background: `linear-gradient(to right, ${color}, ${color} ${frequency}%, transparent ${frequency}%, transparent 100%)`,
        }}
      >
        <span>
          {props.item}
        </span>
        <span className="question-data-item--detail">
          {`${Math.round(frequency)}%`}
        </span>
      </div>
      <div className="question-data-item--detail">
        {props.selections}
      </div>
    </Container>
  );
}

QuestionDataItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.string.isRequired,
  selections: PropTypes.number.isRequired,
  responses: PropTypes.number.isRequired,
};


export default QuestionDataItem;
