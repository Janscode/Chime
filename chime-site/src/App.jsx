import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Campaign from './components/Campaign/Campaign';
import Homepage from './components/Homepage/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignUp from './components/Header/Account/SignUp/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { CampaignProvider } from './contexts/CampaignContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Container className="app-content" fluid="lg">
          <Switch>
            <Route path='/' exact>
              <Homepage />
            </Route>
            <Route path='/campaigns'>
              <CampaignProvider>
                <Campaign />
              </CampaignProvider>
            </Route>
            <Route path='/signup' exact>
              <SignUp />
            </Route>
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
