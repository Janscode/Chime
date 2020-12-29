import React from 'react';
import LastModified from '../LastModified/LastModified';
import './QuestionData.scss';
import QuestionDataItem from './QuestionDataItem/QuestionDataItem';

function QuestionData(props) {
    const selection = (item) => item.selections;
    const sum = (prev, next) => prev + next;
    const responses = props.question.answers.map(selection).reduce(sum);
    return (
        <div className="question-data">
            <div className="question-data__header">
                <h1 className="question-data__header--text"> {props.question.question} </h1>
                <LastModified active={props.question.active} update={props.question.updated} />
            </div>
            <div className="infogroup">
                <div className="infogroup__chart">
                    {/* TODO: add keys */}
                    {props.question.answers.map((answer) => {
                        return (
                            <QuestionDataItem answer={answer} responses={responses} />
                        )
                    })}
                </div>
                <div className="infogroup__toggle">
                    {/* TODO: these buttons probably need to be abstracted into their own components */}
                    <button className="infogroup__toggle--button">Edit</button>
                    <button className="infogroup__toggle--button">{props.question.active ? `Close` : `Reopen`}</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionData
