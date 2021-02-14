/* eslint-disable react/prop-types */
import React from 'react';
import './QuestionDataItem.scss';
import PropTypes from 'prop-types';
import { Col, Container } from 'react-bootstrap';

function QuestionDataItem({ className, response, type }) {
  if (type === 'Text Input') {
    return (
      <Container className={className}>
        <div
          className="text-response"
        >
          { response }
        </div>
      </Container>
    );
  } else {
    const { choice, frequency, votes, isHighest } = response;
    const color = isHighest ? '#BCFFB1' : '#f5f5f5';

    return (
      <Container
        className={`question-data-item d-flex ${className}`}
        fluid
      >
        <Col xs={11}
          className="question-data-item__chart"
          style={{
            // eslint-disable-next-line
            background: `linear-gradient(to right, ${color}, ${color} ${frequency}%, transparent ${frequency}%, transparent 100%)`,
          }}
        >
          <span>
            {choice}
          </span>
          <span className="question-data-item--detail">
            {`${Math.round(frequency)}%`}
          </span>
        </Col>
        <Col className="question-data-item--detail">
          {votes}
        </Col>
      </Container>
    );
  }
}

QuestionDataItem.propTypes = {
  className: PropTypes.string,
};


export default QuestionDataItem;
