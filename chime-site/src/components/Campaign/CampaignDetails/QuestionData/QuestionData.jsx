/* eslint-disable react/prop-types */
import React from 'react';
import LastModified from '../../LastModified/LastModified';
import './QuestionData.scss';
import QuestionDataItem from './QuestionDataItem/QuestionDataItem';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';

// TODO: Max this functional again
function QuestionData({ question }) {
  const { campaignId } = useParams();
  const {
    active,
    lastModified,
    responses,
    prompt,
    type,
    choices,
    totalResponses,
  } = question.data();

  let choiceResponses;
  // Determines if the type is checkbox/radio
  if (responses && !Array.isArray(responses)) {
    choiceResponses = [];
    const highestNumberOfVotes = Object.values(responses).reduce((a, b) => {
      return a.votes > b.votes ? a : b;
    }).votes;
    choices.forEach((choice) => {
      let votes = 0;
      if (responses[choice]) {
        votes = responses[choice].votes;
      }
      const numberOfResponses = totalResponses || 1;

      choiceResponses.push({
        choice,
        frequency: votes/numberOfResponses * 100,
        votes,
        isHighest: votes === highestNumberOfVotes ? true : false,
      });
    });
  }

  const formattedResponses = choiceResponses || responses;

  return (
    <Container className="question-data p-3 mb-4">
      <Row
        className="py-3 justify-content-between"
        noGutters
      >
        <h1 className="question-data--text">
          { prompt }
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
          {formattedResponses?.map((response, idx) => {
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
        <Col className="infogroup__toggle">
          <Button
            as={Link}
            className="m-2"
            to={`/campaigns/${campaignId}/question/${question.id}`}
            variant="outline-secondary"
          >
            Edit
          </Button>
          <Button
            as={Link}
            className="m-2"
            to="#"
            variant="outline-secondary"
          >
            {active ? `Close` : `Reopen`}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

// QuestionData.propTypes = {
// };

export default QuestionData;
