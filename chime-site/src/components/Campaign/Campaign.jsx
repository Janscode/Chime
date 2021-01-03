import React from 'react';
import {campaign} from '../../sample-data/campaign';
import LastModified from './LastModified/LastModified';
import QuestionData from './QuestionData/QuestionData';
import './Campaign.scss';
import {Container, Row} from 'react-bootstrap';

function Campaign() {
  return (
    <Container
      className="campaign p-4"
      fluid
    >
      <Row
        className="justify-content-between pb-4"
        noGutters
      >
        <h6 className="campaign--text"> {campaign.name} </h6>
        <LastModified active={campaign.active} update={campaign.updated} />
      </Row>
      {/* TODO: add keys to questionData */}
      {campaign.questions.map((question, idx) => {
        return (
          <QuestionData
            active={question.active}
            answers={question.answers}
            key={idx}
            question={question.question}
            updated={question.updated}
          />
        );
      })}
      <button className="campaign__add-button">Add Question</button>
    </Container>
  );
}

export default Campaign;

