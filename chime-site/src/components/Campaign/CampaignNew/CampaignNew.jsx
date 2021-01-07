import React, { useRef, useState } from 'react';
import { Form, Card, Col, Row, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import './CampaignNew.scss';
import { useCampaign } from '../../../contexts/CampaignContext';
import { useHistory } from 'react-router-dom';

function CampaignNew() {
  const history = useHistory();
  const surveyName = useRef();
  const ownerInput = useRef();
  const collabID = useRef();
  const recipientInput = useRef();
  const [owners, setOwners] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const { addCampaign } = useCampaign();

  const getOwner = (e) => {
    e.preventDefault();
    if (ownerInput.current.value !== '') {
      setOwners([...owners, ownerInput.current.value]);
      ownerInput.current.value = '';
    }
  };

  const getRecipient = (e) => {
    e.preventDefault();
    if (recipientInput.current.value !== '') {
      setRecipients([...recipients, recipientInput.current.value]);
      recipientInput.current.value = '';
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCampaign(
        surveyName.current.value,
        owners,
        collabID.current.value,
        recipients,
    )
        .then(() => {
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <Container fluid className="px-5 py-3">
      <Form className="new-campaign" onSubmit={onSubmit}>
        <Row>
          <Form.Label
            column
            sm="auto"
            xs={12}
          >
            Campaign Name
          </Form.Label>
          <Col>
            <Form.Control
              placeholder="Quarterly Engagement Survey"
              ref={surveyName}
              required
              type="text"
            />
          </Col>
        </Row>
        <Row className="my-3">
          <Form.Label
            column
            sm="auto"
            xs={12}
          >
            Collaborator ID
          </Form.Label>
          <Col>
            <Form.Control
              placeholder="HR Department"
              ref={collabID}
              required
              type="text"
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Form.Label
            column
            sm="auto"
            xs={12}
          >
            Collaborators
          </Form.Label>
          <Col>
            <InputGroup>
              <FormControl
                aria-label="Collaborators"
                aria-describedby="basic-addon1"
                ref={ownerInput}
                type="text"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-success"
                  onClick={getOwner}
                >
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="my-3">
          {owners.map((owner, idx) => {
            return (
              <Card
                bg="light"
                className="m-2"
                key={idx}
              >
                <Card.Body>
                  {owner}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
        {/* TODO: Add actual user lookup */}
        <Row className="mt-3">
          <Form.Label
            column
            sm="auto"
            xs={12}
          >
            Recipients
          </Form.Label>
          <Col>
            <InputGroup>
              <FormControl
                aria-label="Recipients"
                aria-describedby="basic-addon1"
                ref={recipientInput}
                type="text"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-success"
                  onClick={getRecipient}
                >
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="my-3">
          {recipients.map((recipient, idx) => {
            return (
              <Card
                bg="light"
                className="m-2"
                key={idx}
              >
                <Card.Body>
                  {recipient}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
        <Button block variant="light" type="submit">Done!</Button>
      </Form>
    </Container>
  );
}

export default CampaignNew;
