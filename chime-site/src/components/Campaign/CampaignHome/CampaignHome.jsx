import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Container, Row } from 'react-bootstrap';
import { getCampaignsForCurrUser } from '../../../utils/Campaign';
import CampaignCard from './CampaignCard/CampaignCard';
import { useHistory } from 'react-router-dom';
import Loading from '../../Loading/Loading';

function CampaignHome() {
  const [campaigns, setCampaigns] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const addCampaign = (e) => {
    e.preventDefault();
    history.push('/campaigns/new');
  };

  useEffect(async () => {
    try {
      const docs = await getCampaignsForCurrUser();
      if (!docs.empty) {
        setCampaigns(docs.docs);
      }
    } catch (err) {
      setError(err.toString());
    }
    setLoading(false);
  }, []);

  return (
    <>
      {
        loading ?
          <Loading /> :
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
            {error ?
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
              (!campaigns) ?
                <p
                  className="text-muted text-center p-5"
                  style={{ border: '2px solid #e0e0e0' }}
                >
                  You do not have any campaigns.
                </p> :
                campaigns?.map((doc) => {
                  return (
                    <CampaignCard key={doc.id} docId={doc.id} campaign={doc.data()} />
                  );
                })
            }
            <Button
              block
              className="mt-3 border"
              size="lg"
              type="button"
              variant="secondary"
              onClick={addCampaign}
            >
              Create Campaign
            </Button>
          </Container>
      }
    </>
  );
}

export default CampaignHome;
