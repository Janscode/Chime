import React, { useEffect, useRef, useState } from 'react';
// import { campaign } from '../../../sample-data/campaign';
import LastModified from '../LastModified/LastModified';
import QuestionData from './QuestionData/QuestionData';
import './CampaignDetails.scss';
import { Alert, Container, Row } from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';
import { useHistory, useParams } from 'react-router-dom';

function CampaignDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState();
  const { getCampaignById, getCampaignQuestions } = useCampaign();
  const { campaignId } = useParams();
  const campaignRef = useRef();
  const errorRef = useRef();
  const history = useHistory();

  let header;

  useEffect(() => {
    getCampaignById(campaignId)
        .then((value) => {
          campaignRef.current = value;
          setLoading(false);
        })
        .catch((error) => {
          errorRef.current = error;
          setLoading(false);
        });

    getCampaignQuestions(campaignId)
        .then((value) => {
          setQuestions(value);
        })
        .catch((error) => {
          setError(error);
        });
  }, []);

  const addQuestion = (e) => {
    e.preventDefault();
    history.push(`/campaigns/${campaignId}/add-question`);
  };

  if (!loading) {
    if (campaignRef.current.exists) {
      header = (
        <Row
          className="justify-content-between pb-4"
          noGutters
        >
          <h6 className="campaign--text"> {campaignRef.current.get('name')} </h6>
          {/* TODO: Fix this */}
          <LastModified
            active={campaignRef.current.get('active')}
            update={campaignRef.current.get('lastModified')}
          />
        </Row>
      );
    } else {
      // TODO: Redirect to a 404
      header = (
        <h1>The campaign you are looking for does not exist!</h1>
      );
    }
  }

  return (
    <Container
      className="campaign p-4"
      fluid
    >
      {header}
      {/* TODO: add keys to questionData */}
      { error &&
        <Alert variant="danger">
          No questions could be loaded. {error}
        </Alert>
      }

      {questions?.docs.map((question, idx) => {
        return (
          <QuestionData
            active={question.data().active}
            // answers={question.answers}
            key={idx}
            question={question.data().text}
            updated={question.data().LastModified}
          />
        );
      })}
      <button
        className="campaign__add-button"
        onClick={addQuestion}
      >
        Add Question
      </button>
    </Container>
  );
}

export default CampaignDetails;

