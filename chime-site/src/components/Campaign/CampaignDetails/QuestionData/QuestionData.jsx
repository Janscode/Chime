/* eslint-disable react/prop-types */
import React from 'react';
import LastModified from '../../LastModified/LastModified';
import './QuestionData.scss';
import QuestionDataItem from './QuestionDataItem/QuestionDataItem';
import { Col, Container, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';

// TODO: Max this functional again
function QuestionData({ question }) {
  // eslint-disable-next-line
  const {
    active,
    lastModified,
    responses,
    text,
    type,
  } = question.data();
  // const selection = (item) => item.selections;
  // const sum = (prev, next) => prev + next;
  // const responses = answers.map(selection).reduce(sum);
  return (
    <Container className="question-data p-3 mb-4">
      <Row
        className="py-3 justify-content-between"
        noGutters
      >
        <h1 className="question-data--text">
          { text }
        </h1>
        <LastModified
          active={active}
          update={lastModified?.toDate().toString()}
        />
      </Row>
      <Row
        noGutters
      >
        <Col sm={9} xs={12}>
          {responses?.map((response, idx) => {
            return (
              <QuestionDataItem
                className="my-2"
                key={idx}
                response={response}
                type={type}
              />
            );
          })}
        </Col>
        <Col className="infogroup__toggle d-flex justify-content-end flex-wrap">
          <button className="m-2 infogroup-button">Edit</button>
          <button className="m-2 infogroup-button">
            {active ? `Close` : `Reopen`}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

// QuestionData.propTypes = {
// };

export default QuestionData;
