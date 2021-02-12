import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Campaign from './components/Campaign/Campaign';
import Homepage from './components/Homepage/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './components/Header/Account/Login/Login';
import VerifyEmail from './components/Header/Account/VerifyEmail/VerifyEmail';
import { AuthProvider } from './contexts/AuthContext';
import { CampaignProvider } from './contexts/CampaignContext';
import PrivateRoute from './components/Routing/PrivateRoute';

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
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/verifyEmail' exact>
              <VerifyEmail />
            </Route>
            <CampaignProvider>
              <PrivateRoute redirectTo='/login' path='/campaigns' component={Campaign} />
            </CampaignProvider>
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
