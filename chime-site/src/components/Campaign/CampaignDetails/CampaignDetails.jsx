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
  const [campaign, setCampaign] = useState();
  const { campaignId } = useParams();
  const errorRef = useRef();
  const history = useHistory();

  let header;

  useEffect(() => {
    getCampaignById(campaignId)
        .then((value) => {
          campaign = setCampaign(value);
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
    if (campaign.exists) {
      header = (
        <Row
          className="justify-content-between pb-4"
          noGutters
        >
          <h6 className="campaign--text"> {campaign.data().name} </h6>
          {/* TODO: Fix this */}
          <LastModified
            active={campaign.data().active}
            update={campaign.data().lastModified.toDate().toString()}
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
      { error &&
        <Alert variant="danger">
          No questions could be loaded. {error}
        </Alert>
      }

      {questions?.docs.map((question, idx) => {
        return (
          <QuestionData
            active={question.data().active}
            key={idx}
            question={question.data().text}
            lastModified={question.data().lastModified.toDate().toString()}
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

