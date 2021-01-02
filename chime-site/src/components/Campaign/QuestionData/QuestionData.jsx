import React from 'react';
import LastModified from '../LastModified/LastModified';
import './QuestionData.scss';
import QuestionDataItem from './QuestionDataItem/QuestionDataItem';
import PropTypes from 'prop-types';

function QuestionData(props) {
  const selection = (item) => item.selections;
  const sum = (prev, next) => prev + next;
  const responses = props.answers.map(selection).reduce(sum);
  return (
    <div className="question-data">
      <div className="question-data__header">
        <h1 className="question-data__header--text"> {props.question} </h1>
        <LastModified active={props.active} update={props.updated} />
      </div>
      <div className="infogroup">
        <div className="infogroup__chart">
          {/* TODO: add keys */}
          {props.answers.map((answer, idx) => {
            return (
              <QuestionDataItem
                item={answer.item}
                key={idx}
                responses={responses}
                selections={answer.selections}
              />
            );
          })}
        </div>
        <div className="infogroup__toggle">
          {/* TODO: these buttons probably need to be abstracted into their own components */}
          <button className="infogroup__toggle--button">Edit</button>
          <button className="infogroup__toggle--button">
            {props.active ? `Close` : `Reopen`}
          </button>
        </div>
      </div>
    </div>
  );
}

QuestionData.propTypes = {
  active: PropTypes.bool.isRequired,
  answers: PropTypes.array.isRequired,
  updated: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default QuestionData;
