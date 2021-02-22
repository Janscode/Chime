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
import PropTypes from 'prop-types';
import { X } from 'react-bootstrap-icons';
import './UserSearch.scss';
import { getUserByEmail, getUserById } from '../../../../utils/Campaign';

const SUGGESTION_LIMIT = 5;

export default function UserSearch({
  className = '',
  defaultEmpty = false,
  displayPeople = true,
  onAddPerson,
  org,
  type,
}) {
  const { currentUser } = useAuth();
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState();
  const suggFocus = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

  useEffect(() => {
    onAddPerson(people);
  }, [people]);

  const getPeople = () => {
    if (person !== '') {
      getUserByEmail(person)
          .then((personDoc) => {
            if (!personDoc.empty) {
              const personData = personDoc.docs[0].data();
              if (!people.some((peep) => personData.uid === peep.uid)) {
                setPeople([...people, personData]);
                setError('');
              }
            } else {
              setError(`The person ${person} does not exist!`);
            }
            setPerson('');
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

  const getSuggestedPeople = () => {
    if (org) {
      const members = org.members;
      const suggs = members.filter((member) => {
        return member.indexOf(person) !== -1;
      });

      setSuggestions(suggs);

      if (person === '') {
        setSuggestions([]);
      }
    }
  };

  const controlFlowInput = (e) => {
    e.stopPropagation();
    if (e.key === 'ArrowDown' && suggFocus.current[0].current) {
      e.preventDefault();
      suggFocus.current[0].current.focus();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      getPeople();
    }
  };

  const controlFlow = (e, idx) => {
    e.stopPropagation();
    if (e.key === 'ArrowDown' && idx < SUGGESTION_LIMIT - 1) {
      if (suggFocus.current[idx + 1].current) {
        suggFocus.current[idx + 1].current.focus();
      }
    } else if (e.key === 'ArrowUp' && idx > 0) {
      suggFocus.current[idx - 1].current.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setPerson(suggFocus.current[idx].current.innerText);
      document.querySelector(`#${ID}`).focus();
    } else if (e.key === 'Escape' || (e.key === 'ArrowUp' && idx === 0)) {
      document.querySelector(`#${ID}`).focus();
    }
  };

  useEffect(() => {
    if (!defaultEmpty && currentUser) {
      getUserById(currentUser.uid)
          .then((userDoc) => {
            if (!userDoc.empty) {
              setPeople([userDoc.docs[0].data()]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }, []);

  useEffect(() => {
    getSuggestedPeople();
  }, [person]);

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
              className="user__input"
              id={ID}
              value={person}
              type="text"
              onChange={(e) => {
                setPerson(e.target.value);
              }}
              onKeyDown={controlFlowInput}
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
          {suggestions &&
            <Container className="user__suggestions">
              {suggestions.slice(0, SUGGESTION_LIMIT).map((sugg, idx) => {
                return (
                  <Card
                    className="text-center highlight"
                    key={sugg}
                    ref={suggFocus.current[idx]}
                    role="option"
                    tabIndex="0"
                    onKeyDown={(e) => controlFlow(e, idx)}
                    onClick={() => {
                      setPerson(suggFocus.current[idx].current.innerText);
                      document.querySelector(`#${ID}`).focus();
                    }}
                  >
                    { sugg }
                  </Card>
                );
              })}
            </Container>
          }
        </Col>
      </Row>
      {displayPeople &&
        <Row className="my-3">
          {people.map((person) => {
            return (
              <Card
                bg="light"
                className="m-2"
                key={person.uid}
              >
                <Card.Body className="d-flex p-3 align-items-center">
                  {person.email}
                  <Button
                    className="py-1 px-1 ml-3"
                    onClick = {() => {
                      removePerson(person);
                    }}
                    variant="outline-danger"
                  >
                    <X
                      size={25}
                    />
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      }
    </Container>
  );
}

UserSearch.propTypes = {
  className: PropTypes.string,
  defaultEmpty: PropTypes.bool,
  displayPeople: PropTypes.bool,
  onAddPerson: PropTypes.func.isRequired,
  org: PropTypes.object,
  type: PropTypes.string,
};
