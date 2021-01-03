import React from 'react';
import LastModified from '../LastModified/LastModified';
import './QuestionData.scss';
import QuestionDataItem from './QuestionDataItem/QuestionDataItem';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';

function QuestionData(props) {
  const selection = (item) => item.selections;
  const sum = (prev, next) => prev + next;
  const responses = props.answers.map(selection).reduce(sum);
  return (
    <Container className="question-data p-3 mb-4">
      <Row
        className="py-3 justify-content-between"
        noGutters
      >
        <h1 className="question-data--text">
          {props.question}
        </h1>
        <LastModified
          active={props.active}
          update={props.updated}
        />
      </Row>
      <Row noGutters>
        <Col sm={9} xs={12}>
          {/* TODO: add keys */}
          {props.answers.map((answer, idx) => {
            return (
              <QuestionDataItem
                className="my-2"
                item={answer.item}
                key={idx}
                responses={responses}
                selections={answer.selections}
              />
            );
          })}
        </Col>
        <Col className="infogroup__toggle d-flex justify-content-end flex-wrap">
          {/* TODO: these buttons probably need to be abstracted into their own components */}
          <button className="m-2 infogroup-button">Edit</button>
          <button className="m-2 infogroup-button">
            {props.active ? `Close` : `Reopen`}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

QuestionData.propTypes = {
  active: PropTypes.bool.isRequired,
  answers: PropTypes.array.isRequired,
  updated: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default QuestionData;
