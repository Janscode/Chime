/* eslint-disable react/prop-types */
/* eslint-disable */
import React from 'react';
import './QuestionDataItem.scss';
import PropTypes from 'prop-types';
import { Col, Container } from 'react-bootstrap';

function QuestionDataItem({ className, response, type }) {
  const color = '#f5f5f5';
  if (type === 'Text Input') {
    return (
      <Container>
        <div
          className="text-response"
        >
          { response }
        </div>
      </Container>
    );
  }
  // else {
  //   return (
  //     <Container
  //       className={`question-data-item d-flex ${className}`}
  //       fluid
  //     >
  //       <Col xs={11}
  //         className="question-data-item__chart"
  //         style={{
  //           // eslint-disable-next-line
  //           background: `linear-gradient(to right, ${color}, ${color} ${frequency}%, transparent ${frequency}%, transparent 100%)`,
  //         }}
  //       >
  //         <span>
  //           {props.item}
  //         </span>
  //         <span className="question-data-item--detail">
  //           {`${Math.round(frequency)}%`}
  //         </span>
  //       </Col>
  //       <Col className="question-data-item--detail">
  //         {props.selections}
  //       </Col>
  //     </Container>
  //   );
  // }
}

QuestionDataItem.propTypes = {
  className: PropTypes.string,
};


export default QuestionDataItem;
