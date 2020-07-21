import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import UserList from './components/UserListing';
import UserCreation from './components/UserCreation';
import UserEdit from './components/UserEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/create-user" component={UserCreation} />
          <Route path="/edit-user/:id" component={UserEdit} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
