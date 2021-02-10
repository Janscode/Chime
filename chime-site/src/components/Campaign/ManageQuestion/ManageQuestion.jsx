import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';

function ManageQuestion() {
  const questionTypes = [
    'Text Input',
    'Rating Boxes',
  ];

  const [questionName, setQuestionName] = useState('');
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { addQuestionToCampaign, getQuestionById, updateQuestion } = useCampaign();
  const { campaignId, qid } = useParams();
  const history = useHistory();


  useEffect(() => {
    let mount = true;

    if (qid !== 'new') {
      getQuestionById(qid)
          .then((doc) => {
            if (mount && doc.exists) {
              const { text: qname, type } = doc.data();
              setQuestionType(type);
              setQuestionName(qname);
              setLoading(false);
            }
          });
    } else {
      setLoading(false);
    }
    return () => {
      mount = false;
    };
  }, []);

  const trackName = (e) => {
    setQuestionName(e.target.value);
  };

  const trackType = (e) => {
    setQuestionType(e.target.value);
  };

  const displayQuestion = (name) => {
    switch (name) {
      case 'Text Input':
        return (
          <Form.Group>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
        );
      case 'Rating Boxes':
        return (
          <p>This element is a work in progress</p>
        );
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (qid === 'new') {
      addQuestionToCampaign(
          campaignId,
          questionName,
          questionType,
      )
          .then(() => {
            history.goBack();
          })
          .catch((error) => {
            setError(error);
          });
    } else {
      updateQuestion(
          qid,
          questionName,
          questionType,
      )
          .then(() => {
            history.goBack();
          })
          .catch((error) => {
            setError(error.toString());
          });
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" />
    );
  } else {
    return (
      <Container fluid className="px-5 py-3">
        {error && <Alert variant="danger">
          <p>An error has occured adding this questions. </p>
        </Alert>}
        <Form
          className="new-campaign"
          onSubmit={submit}
        >
          <Row>
            <Form.Label
              column
              sm="auto"
              xs={12}
            >
              Question
            </Form.Label>
            <Col>
              <Form.Control
                placeholder="Are virtual meetings as effective as in-person meetings?"
                value={questionName}
                required
                type="text"
                onBlur={trackName}
                onChange={trackName}
              />
            </Col>
          </Row>
          <Form.Group
            as={Row}
            className="my-3"
            controlId="id"
          >
            <Form.Label
              column
              sm="auto"
              xs={12}
            >
              Type of Question
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                onChange={trackType}
                value={questionType}
              >
                {questionTypes.map((type) => {
                  return (
                    <option key={type}>{type}</option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <hr />
          <Card>
            <Card.Header className="text-center">
              This is a preview of your question
            </Card.Header>
            <Card.Body>
              {questionName}
              {displayQuestion(questionType)}
            </Card.Body>
          </Card>
          <hr />
          <Button
            block
            type="submit"
            variant="light"
          >
            Done!
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ManageQuestion;
