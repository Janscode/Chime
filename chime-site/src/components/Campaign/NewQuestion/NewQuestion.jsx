import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';

function NewQuestion() {
  const questionTypes = [
    'Text Input',
    // 'Rating Boxes',
  ];

  const questionNameRef = useRef();
  const questionTypeRef = useRef();
  const [questionName, setQuestionName] = useState('');
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [error, setError] = useState('');
  const { addQuestionToCampaign } = useCampaign();
  const { campaignId } = useParams();
  const history = useHistory();

  const trackName = () => {
    setQuestionName(questionNameRef.current.value);
  };

  const trackType = () => {
    console.log(questionTypeRef.current.value);
    setQuestionType(questionTypeRef.current.value);
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
    addQuestionToCampaign(
        campaignId,
        questionNameRef.current.value,
        questionTypeRef.current.value,
    )
        .then(() => {
          history.goBack();
        })
        .catch((error) => {
          setError(error);
        });
  };

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
              ref={questionNameRef}
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
              ref={questionTypeRef}
              onChange={trackType}
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

export default NewQuestion;
