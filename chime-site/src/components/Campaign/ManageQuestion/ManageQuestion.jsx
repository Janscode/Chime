import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { useCampaign } from '../../../contexts/CampaignContext';
import { X } from 'react-bootstrap-icons';

const QUESTION_TYPES = [
  'Text Input',
  'Radio Buttons',
  'Checkboxes',
  // TODO: Rating
];

function ManageQuestion() {
  const [question, setQuestion] = useState({
    prompt: '',
    type: QUESTION_TYPES[0],
    choices: [],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { addQuestionToCampaign, getQuestionById, updateQuestion } = useCampaign();
  const { campaignId, qid } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (question.type === 'Radio Buttons' || question.type === 'Checkboxes') {
      if (question.choices.length === 0) {
        setQuestion({
          ...question,
          choices: ['Option 1'],
        });
      }
    } else if (question.choices.length !== 0) {
      setQuestion({
        ...question,
        choices: [],
      });
    }
  }, [question.type, question.choices]);

  useEffect(() => {
    let mount = true;

    if (qid !== 'new') {
      getQuestionById(qid)
          .then((doc) => {
            if (mount && doc.exists) {
              const { text: prompt, type, choices } = doc.data();
              setQuestion({
                prompt: prompt,
                type: type,
                choices: choices,
              });
              setLoading(false);
            }
          })
          .catch((error) => {
            if (mount) {
              setError(error);
              setLoading(false);
            }
          });
    } else {
      setLoading(false);
    }
    return () => {
      mount = false;
    };
  }, []);

  const displayQuestion = ({ prompt, type, choices }) => {
    switch (type) {
      case 'Text Input':
        return (
          <Form>
            <b>{prompt}</b>
            <Form.Group>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Form>
        );
      case 'Radio Buttons':
      case 'Checkboxes':
        return (
          <Form>
            <b>{prompt}</b>
            {choices.map((choice) => (
              <Form.Check
                key={choice}
                label={choice}
                name="preview"
                type={type == 'Radio Buttons' ? 'radio' : 'checkbox'}
              />
            ))}
          </Form>
        );
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (qid === 'new') {
        await addQuestionToCampaign(campaignId, question);
      } else {
        await updateQuestion(qid, question);
      }
    } catch (err) {
      setError(err);
    }
    history.goBack();
  };

  if (!loading) {
    return (
      <Container
        className="px-5 py-3"
        style={{
          backgroundColor: 'white',
        }}
        fluid
      >
        {error && (
          <Alert variant="danger">
            <p>An error has occured adding this questions. </p>
          </Alert>
        )}
        <Form
          className="new-campaign"
        >
          <Row>
            <Form.Label column sm="auto" xs={12}>
              Question
            </Form.Label>
            <Col>
              <Form.Control
                placeholder="Are virtual meetings as effective as in-person meetings?"
                type="text"
                onChange={(e) =>
                  setQuestion({ ...question, prompt: e.target.value })
                }
                value={question.prompt}
              />
            </Col>
          </Row>
          <Form.Group
            as={Row}
            className="my-3"
            controlId="id"
          >
            <Form.Label
              column
              sm="auto"
              xs={12}
            >
              Type of Question
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setQuestion({ ...question, type: e.target.value })
                }
                value={question.type}
              >
                {QUESTION_TYPES.map((type) => {
                  return <option key={type}>{type}</option>;
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          {question.type == 'Radio Buttons' || question.type == 'Checkboxes' ? (
            <ChoiceEditor
              choices={question.choices}
              setChoices={(choices) => setQuestion({ ...question, choices })}
            />
            ) : null}
        </Form>
        <hr />
        <Card>
          <Card.Header className="text-center">
            This is a preview of your question
          </Card.Header>
          <Card.Body>
            {question.name}
            {displayQuestion(question)}
          </Card.Body>
        </Card>
        <hr />
        <Button
          block
          className="border"
          onClick={submit}
          variant="light"
        >
          {`${qid === 'new' ? 'Add' : 'Update'} Question`}
        </Button>
      </Container>
    );
  } else {
    return (
      <Spinner animation="border" />
    );
  }
}

function ChoiceEditor({ choices, setChoices }) {
  return (
    <div>
      {choices.map((choice, i) => (
        <InputGroup
          className="my-2"
          key={i}
        >
          <InputGroup.Prepend>
            <Button
              className="py-0 px-1"
              onClick={() =>
                setChoices(choices.slice(0, i).concat(choices.slice(i + 1)))
              }
              variant="outline-danger"
            >
              <X size={30}/>
            </Button>
            <Form.Control
              placeholder="Are virtual meetings as effective as in-person meetings?"
              required
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              type="text"
              value={choice}
              onChange={(e) =>
                setChoices([
                  ...choices.slice(0, i),
                  e.target.value,
                  ...choices.slice(i + 1),
                ])
              }
            />
          </InputGroup.Prepend>
        </InputGroup>
      ))}
      <Button
        block
        className="border"
        variant="light"
        onClick={() => setChoices([...choices, `Option ${choices.length + 1}`])}
      >
        Add Choice
      </Button>
    </div>
  );
}

ChoiceEditor.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  setChoices: PropTypes.func,
};

export default ManageQuestion;
