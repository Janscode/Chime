import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { createOrg, getOrgById, updateOrg } from '../../../utils/Org';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import UserSearch from '../../Campaign/CampaignNew/UserSearch/UserSearch';

function OrgManage({ children }) {
  const newGroupRef = useRef();
  const { currentUser } = useAuth();
  const history = useHistory();
  const { orgId } = useParams();
  const [loading, setLoading] = useState(true);
  /* eslint-disable-next-line */
  const [currentGroupIndex, setCurrentGroupIndex] = useState();

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
        if (orgId === 'create') {
          await createOrg(org);
        } else {
          await updateOrg(orgId, org);
        }
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addGroup = () => {
    if (newGroupRef.current.value) {
      const newGroups = org.groups ?
      [{ name: newGroupRef.current.value }, ...org.groups] :
      [{ name: newGroupRef.current.value }];

      setOrg({
        ...org,
        groups: newGroups,
      });

      setCurrentGroupIndex(0);
    }
  };

  useEffect(async () => {
    let mount = true;

    if (orgId !== 'create') {
      try {
        const orgDoc = await getOrgById(orgId);
        if (mount && orgDoc.exists) {
          setOrg({
            ...orgDoc.data(),
          });
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, []);

  console.log(org);

  if (!loading) {
    return (
      <Form onSubmit={submit}>
        <Form.Group>
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
        <Form.Group>
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
          {org.members && org.members[0]?.length > 0 && (
            <Alert
              style={{ maxHeight: '20vh', overflow: 'scroll' }}
              variant="info"
            >
              <Alert.Heading className="text-center">
                {`${org.members.length} Emails Parsed`}
              </Alert.Heading>
              {org.members.join(' ')}
            </Alert>
          )}
        </Form.Group>
        <Form.Group>
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
        <Form.Group as={Container}>
          <Row noGutters>
            <Col as={Card} md={4} sm={6} xs={12}>
              <Card.Header className="text-center">
                Groups
              </Card.Header>
              <Card.Body>
                <InputGroup>
                  <FormControl
                    aria-label="Group name"
                    placeholder="Group name"
                    ref={newGroupRef}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addGroup();
                      }
                    }}
                  />
                  <InputGroup.Append as={Button} variant="outline-success" onClick={addGroup}>
                    Add
                  </InputGroup.Append>
                </InputGroup>
              </Card.Body>
              <Card.Body>
                {org.groups &&
                  <Form.Control as="select" onChange={(e) => {
                    setCurrentGroupIndex(
                        Array.from(org.groups).findIndex((group) => group.name === e.target.value),
                    );
                  }}>
                    {org.groups.map((group) => {
                      return (
                        <option key={group.name}>{group.name}</option>
                      );
                    })}
                  </Form.Control>
                }
              </Card.Body>
            </Col>
            <Col as={Card}>
              <Card.Body>
                {org.groups &&
                  <>
                    <UserSearch
                      defaultEmpty
                      displayPeople={false}
                      org={org}
                      onAddPerson={(people) => {
                        const group = org.groups[
                          currentGroupIndex ? currentGroupIndex : 0
                        ];
                        const peopleEmails = people.map((person) => {
                          return person.email;
                        });

                        const newEmailList = group.members ?
                          Array.from(
                              new Set(
                                  group?.members.concat(peopleEmails),
                              ),
                          ) :
                          peopleEmails;
                        setOrg({
                          ...org,
                          groups: [
                            ...org.groups.slice(0, (currentGroupIndex ? currentGroupIndex : 0)),
                            {
                              ...group,
                              members: newEmailList,
                            },
                            ...org.groups.slice((currentGroupIndex ? currentGroupIndex : 0) + 1),
                          ],
                        });
                      }}
                      /* eslint-disable-next-line */
                      type={`${org.groups?.[currentGroupIndex ? currentGroupIndex : 0].name} members`}
                    />
                    <Container>
                      {org.groups?.[currentGroupIndex ? currentGroupIndex : 0].members
                          ?.map((member) => {
                            return (
                              <span key={member}>
                                {member}{' '}
                              </span>
                            );
                          })
                      }
                    </Container>
                  </>
                }
              </Card.Body>
            </Col>
          </Row>
        </Form.Group>
        <Button className="border" block type="submit" variant="light">
          {`${orgId == 'create' ? 'Create' : 'Update'} Organization`}
        </Button>
      </Form>
    );
  } else {
    return (
      <Loading />
    );
  }
}

OrgManage.propTypes = {
  children: PropTypes.node,
};

export default OrgManage;
