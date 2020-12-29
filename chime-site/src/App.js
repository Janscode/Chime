import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Campaign from './components/Campaign/Campaign';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Header />
      <div className="app-content">
        <Campaign />
      </div>
      <Switch>
        <Route path='/' exact />
      </Switch>
    </Router>
    </>
  );
}

export default App;
