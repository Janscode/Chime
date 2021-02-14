import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
function CampaignCard({ docId, campaign }) {
  const [open, setOpen] = useState(false);
  let body;
  // TODO: query for active questions
  if ('questions' in campaign && campaign.questions.length === 0) {
    body = (
      <p>You have no questions in this survey</p>
    );
  } else {
    body = (
      <p>This feature is not yet complete</p>
    );
  }

  return (
    <Accordion
      className="mb-3"
      onSelect={(ekey) => {
        setOpen(ekey !== null);
      }}
    >
      <Card>
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          variant="light"
        >
          <h5>
            {campaign.name}
          </h5>
          {/* TODO: Make this work */}
          <span>
            230 responses
            <Accordion.Toggle
              eventKey="0"
              as={Button}
              className="mx-2"
              variant="light"
            >
              {open ?
                <ChevronDown size={20}/> :
                <ChevronUp size={20}/>
              }
            </Accordion.Toggle>
          </span>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="text-center">
            {body}
            <Link to={`/campaigns/${docId}`}>Click here to view full campaign details.</Link>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

CampaignCard.propTypes = {
  docId: PropTypes.string.isRequired,
  campaign: PropTypes.object,
};

export default CampaignCard;
