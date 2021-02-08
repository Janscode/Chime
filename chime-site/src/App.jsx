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
            <Route path='/signup' exact>
              <SignUp />
            </Route>
            <CampaignProvider>
              <PrivateRoute redirectTo='/signup' path='/campaigns' component={Campaign} />
            </CampaignProvider>
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
