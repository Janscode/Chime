import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Campaign from './components/Campaign/Campaign';
import Homepage from './components/Homepage/Homepage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container className="app-content" fluid="lg">
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/campaigns' exact>
            <Campaign />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
