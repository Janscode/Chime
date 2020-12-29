import React from 'react'
import { campaign } from '../../sample-campaign-data';
import LastModified from './LastModified/LastModified';
import QuestionData from './QuestionData/QuestionData';
import './Campaign.scss';

function Campaign() {
    return (
        <div className="campaign">
            <div className="campaign__title">
                <h6 className="campaign__title--text"> {campaign.name} </h6>
                <LastModified active={campaign.active} update={campaign.updated} />
            </div>
            {/* TODO: add keys to questionData */}
            {campaign.questions.map((question) => {
                return (
                    <QuestionData question={question} />
                )
            })}
            <button className="campaign__add-button">Add Question</button>
        </div>
    )
}

export default Campaign

