import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Reader from './components/Reader/Reader';

const App = () => (
  <Switch>
    <Route path="/reader" component={Reader} />;
    <Redirect to="/reader" />
  </Switch>
);

export default App;
