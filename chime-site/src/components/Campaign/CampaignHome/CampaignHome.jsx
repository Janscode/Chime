import React, { useRef, useState, useEffect } from 'react';
import { Alert, Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';
import CampaignCard from './CampaignCard/CampaignCard';
import { useHistory } from 'react-router-dom';

function CampaignHome() {
  const dbContent = useRef(null);
  const dbError = useRef(false);
  const [loading, setLoading] = useState(true);
  const { getCampaignsForCurrUser } = useCampaign();
  const history = useHistory();
  const addCampaign = (e) => {
    e.preventDefault();
    history.push('/campaigns/new');
  };

  useEffect(() => {
    getCampaignsForCurrUser()
        .then((docs) => {
          dbContent.current = docs;
          setLoading(false);
        })
        .catch((error) => {
          dbError.current = error;
          setLoading(false);
        });
  }, []);

  return (
    <>
      {
        loading ?
          <Spinner
            animation="border"
            style={{
              position: 'fixed',
              zIndex: 10,
              width: '50',
              height: '50',
              left: 'calc(50% - 50px)',
              top: 'calc(20% - 50px)',
            }}
            role="status"
          >
            <span className="sr-only">loading...</span>
          </Spinner> :
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
            {dbError.current ?
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
              (dbContent.current?.empty) ?
                <p
                  className="text-muted text-center p-5"
                  style={{ border: '2px solid #e0e0e0' }}
                >
                  You do not have any campaigns.
                </p> :
                dbContent.current?.docs.map((doc) => {
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
