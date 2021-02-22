import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import './CampaignNew.scss';
import { useHistory } from 'react-router-dom';
import UserSearch from './UserSearch/UserSearch';
import { getUserOrgs } from '../../../utils/Org';
import { addCampaign } from '../../../utils/Campaign';

function CampaignNew() {
  const history = useHistory();
  const [orgs, setOrgs] = useState([]);
  const [activeOrg, setActiveOrg] = useState();
  const [campaign, setCampaign] = useState({
    name: '',
    collaborators: [],
    collabName: '',
    recipients: [],
  });

  useEffect(() => {
    let mount = true;

    getUserOrgs()
        .then((orgs) => {
          if (mount && !orgs.empty) {
            setOrgs(orgs.docs);
            setActiveOrg(orgs.docs[0]);
          }
        });
    return () => {
      mount = false;
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (owners && recipients && campaign.name && campaign.collabName) {
      await addCampaign({
        ...campaign,
      }).catch(console.error);
      history.goBack();
    }
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
              value={campaign.name}
              required
              type="text"
              onChange={(e) => {
                setCampaign({ ...campaign, name: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row className="my-3">
          <Form.Label
            column
            sm="auto"
            xs={12}
          >
            Collaborator Id
          </Form.Label>
          <Col>
            <Form.Control
              placeholder="HR Department"
              value={campaign.collabName}
              required
              type="text"
              onChange={(e) => {
                setCampaign({ ...campaign, collabName: e.target.value });
              }}
            />
          </Col>
        </Row>
        {(orgs && activeOrg) &&
          <Row className="my-3">
            <Form.Label
              column
              sm="auto"
              xs={12}
            >
              Organization
            </Form.Label>
            <Col>
              <ToggleButtonGroup
                name="org-toggle"
                type="radio"
                value={activeOrg.id}
                onChange={(val) => {
                  const orgfound = orgs.find((org) => org.id === val);
                  if (orgfound) {
                    setActiveOrg(orgfound);
                  }
                }}
              >
                {orgs.map((org) => {
                  return (
                    <ToggleButton
                      key={org.id}
                      value={org.id}
                    >
                      {org.data().name}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Col>
          </Row>
        }
        <hr />
        <UserSearch
          type="Collaborators"
          org={activeOrg?.data()}
          onAddPerson={(people) => {
            setCampaign({
              ...campaign,
              collaborators: Array.from(people).map((person) => {
                return person.uid;
              }),
            });
          }}
        />
        <UserSearch
          onAddPerson={(people) => {
            setCampaign({
              ...campaign,
              recipients: Array.from(people).map((person) => {
                return person.uid;
              }),
            });
          }}
          org={activeOrg?.data()}
          type="Recipients"
        />
        <Button block variant="light" type="submit">Done!</Button>
      </Form>
    </Container>
  );
}

export default CampaignNew;
