import React from 'react';
import './QuestionDataItem.scss';

function QuestionDataItem(props) {
    const frequency = (props.answer.selections / props.responses) * 100;
    const color = "#f5f5f5";
    return (
        <div
            className="question-data-item"
        >
            <div
                className="question-data-item__chart"
                style={{ background: `linear-gradient(to right, ${color}, ${color} ${frequency}%, transparent ${frequency}%, transparent 100%)` }}
            >
                <span>
                    {props.answer.item}
                </span>
                <span className="question-data-item--detail">
                    {`${Math.round(frequency)}%`}
                </span>
            </div>
            <div className="question-data-item--detail">
                {props.answer.selections}
            </div>
        </div>
    )
}

export default QuestionDataItem
