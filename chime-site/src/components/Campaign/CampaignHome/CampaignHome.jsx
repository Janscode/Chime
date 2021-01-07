import React, { useState } from 'react';
import { Alert, Button, Card, Container, Row } from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';
import CampaignCard from './CampaignCard/CampaignCard';
import { useHistory } from 'react-router-dom';

function CampaignHome() {
  const [dbContent, setDBContent] = useState(null);
  const [dbError, setDbError] = useState(false);
  const { getCampaigns } = useCampaign();
  const history = useHistory();
  const addCampaign = (e) => {
    e.preventDefault();
    history.push('/campaigns/new');
  };

  getCampaigns()
      .then((docs) => {
        setDBContent(docs);
      })
      .catch((error) => {
        setDbError(error);
      });

  return (
    <Container
      className="campaign p-4"
      fluid
    >
      <Row
        className="pb-4"
        noGutters
      >
        <h6 className="campaign--text"> My Campaigns </h6>
      </Row>
      {dbError ?
          <Alert variant="danger">
            <Card>
              <Card.Header>
                There was an error retrieving your campaigns!
              </Card.Header>
              <Card.Body>
                {error}
              </Card.Body>
            </Card>
          </Alert> :
        (dbContent?.empty) ?
          <p
            className="text-muted text-center p-5"
            style={{ border: '2px solid #e0e0e0' }}
          >
            You do not have any campaigns.
          </p> :
          dbContent?.forEach((doc) => {
            <CampaignCard key={doc.id} {...doc}/>;
          })
      }
      <Button
        block
        className="mt-3"
        size="lg"
        type="button"
        variant="secondary"
        onClick={addCampaign}
      >
        Create Campaign
      </Button>
    </Container>
  );
}

export default CampaignHome;
