import React, { useEffect, useRef, useState } from 'react';
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
import { useAuth } from '../../../../contexts/AuthContext';
import { useCampaign } from '../../../../contexts/CampaignContext';
import PropTypes from 'prop-types';
import './UserSearch.scss';

// eslint-disable-next-line react/display-name
const UserSearch = React.forwardRef(({ className = '', type, defaultEmpty = false }, ref) => {
  const { getUserByEmail, getUserById } = useCampaign();
  const { currentUser } = useAuth();
  const peopleInput = useRef();
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');

  ref.current = people;

  useEffect(() => {
    if (!defaultEmpty && currentUser) {
      getUserById(currentUser.uid)
          .then((userDoc) => {
            if (!userDoc.empty) {
              setPeople([userDoc.docs[0].data()]);
            }
          });
    }
  }, []);

  const getPeople = (e) => {
    e.preventDefault();
    if (peopleInput.current.value !== '') {
      getUserByEmail(peopleInput.current.value)
          .then((person) => {
            if (!person.empty) {
              const p = person.docs[0].data();
              if (!people.some((person) => p.uid === person.uid + '1')) {
                setPeople([...people, p]);
                setError('');
              }
              peopleInput.current.value = '';
            } else {
              setError(`The person ${peopleInput.current.value} does not exist!`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  const removePerson = (personToDelete) => {
    setPeople(
        people.filter((person) => person !== personToDelete),
    );
  };

  return (
    <Container
      className={className}
    >
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>
      }
      <Row>
        <Form.Label
          column
          sm="auto"
          xs={12}
        >
          { type }
        </Form.Label>
        <Col>
          <InputGroup>
            <FormControl
              aria-label={ type }
              aria-describedby="basic-addon1"
              ref={peopleInput}
              type="text"
            />
            <InputGroup.Append>
              <Button
                variant="outline-success"
                onClick={getPeople}
              >
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className="my-3">
        {people.map((person) => {
          return (
            <Card
              bg="light"
              className="m-2"
              key={person.uid}
            >
              <Card.Body class="flex-card">
                {person.email}
                <Button id="removeParticipantButton" variant="outline-danger" onClick = {() => {
                  removePerson(person);
                }}>X</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
});

UserSearch.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  defaultEmpty: PropTypes.bool,
};


export default UserSearch;
