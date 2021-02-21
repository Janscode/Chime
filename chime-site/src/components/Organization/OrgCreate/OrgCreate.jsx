import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { createOrg } from '../../../utils/Org';
import { useHistory } from 'react-router-dom';

function OrgCreate({ children }) {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [org, setOrg] = useState({
    name: '',
    members: [currentUser.email],
    owners: [currentUser.email],
  });

  const submit = async (e) => {
    e.preventDefault();

    if (org.name && org.members[0]?.length > 0 && org.owners[0]?.length > 0) {
      org.owners.forEach((owner) => {
        if (!org.members.includes(owner)) {
          setOrg({
            ...org,
            members: [...org.members, owner],
          });
        }
      });

      try {
        await createOrg(org);
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Organization Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="XYZ Corp"
          value={org.name}
          onChange={(e) => {
            setOrg({ ...org, name: e.target.value });
          }}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Organization Member Emails (CSV)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={org.members}
          onChange={(e) => {
            setOrg({
              ...org,
              members: e.target.value.split(','),
            });
          }}
        />
        {(org.members && org.members[0]?.length > 0) &&
          <Alert style={{ maxHeight: '20vh', overflow: 'scroll' }} variant="info">
            <Alert.Heading
              className="text-center"
            >
              {`${org.members.length} Emails Parsed`}
            </Alert.Heading>
            {org.members.join(' ')}
          </Alert>
        }
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea2">
        <Form.Label>Organization Owners</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={org.owners}
          onChange={(e) => {
            setOrg({
              ...org,
              owners: e.target.value.split(','),
            });
          }}
        />
      </Form.Group>
      <Button
        className="border"
        block
        type="submit"
        variant="light"
      >
        Create Organization
      </Button>
    </Form>
  );
}

OrgCreate.propTypes = {
  children: PropTypes.node,
};

export default OrgCreate;
