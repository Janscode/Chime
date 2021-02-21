import React from 'react';
import { Alert, Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../../contexts/AuthContext';

const NO_ORG_OPTIONS = [
  // TODO: Join does nothing
  { option: 'Join', route: '/organizations/join' },
  { option: 'Create', route: '/organizations/create' },
];

function NoOrg() {
  return (
    <Alert variant="warning">
      <Alert.Heading className="text-center">
        You are not a part of any organizations!
      </Alert.Heading>
      {/* TODO: this is almost certainly a hack that won't work universally */}
      <Row style={{ alignItems: 'baseline' }}>
        {NO_ORG_OPTIONS.map(({ option, route }) => {
          return (
            <Button
              as={Link}
              block
              className="col mx-3"
              key={option}
              to={route}
              variant="warning"
            >
              {option}
            </Button>
          );
        })}
      </Row>
    </Alert>
  );
}

function Org({ doc, className }) {
  const { currentUser } = useAuth();
  /* eslint-disable-next-line */
  const { name, owners } = doc.data();
  return (
    <Card className={className}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        { name }
        {owners.includes(currentUser.email) &&
          <Button disabled>
            {/* TODO: make this actually do something */}
            Manage
          </Button>
        }
      </Card.Header>
    </Card>
  );
};

function OrgHome({ docs }) {
  return (
    <>
      {docs.empty ?
        <NoOrg /> :
        <>
          <h3>Your organizations:</h3>
          {docs.docs.map((doc) => {
            return <Org key={doc.id} doc={doc} className="my-3" />;
          })}
        </>
      }
    </>
  );
}

OrgHome.propTypes = {
  docs: PropTypes.object.isRequired,
};

Org.propTypes = {
  doc: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default OrgHome;
