import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Campaign from './components/Campaign/Campaign';
import Homepage from './components/Homepage/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-content">
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/campaigns' exact>
            <Campaign />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
