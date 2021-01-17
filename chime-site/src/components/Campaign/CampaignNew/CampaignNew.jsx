import React, { useRef } from 'react';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import './CampaignNew.scss';
import { useCampaign } from '../../../contexts/CampaignContext';
import { useHistory } from 'react-router-dom';
import UserSearch from './UserSearch/UserSearch';

function CampaignNew() {
  const history = useHistory();
  const surveyName = useRef();
  const ownerInput = useRef();
  const collabID = useRef();
  const recipientInput = useRef();
  const { addCampaign } = useCampaign();

  const onSubmit = (e) => {
    e.preventDefault();

    const owners = ownerInput.current.map((value) => {
      return value.uid;
    });

    const recipients = recipientInput.current.map((value) => {
      return value.uid;
    });

    addCampaign(
        surveyName.current.value,
        collabID.current.value,
        owners,
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
        <UserSearch
          ref={ownerInput}
          type="Collaborators"
        />
        <UserSearch
          ref={recipientInput}
          type="Recipients"
        />
        <Button block variant="light" type="submit">Done!</Button>
      </Form>
    </Container>
  );
}

export default CampaignNew;
