import React from 'react';
import Navigation from './components/navigation';
import Home from './components/home';
import Property from './components/property';
import Request from './components/request';
import PropertyDetail from './components/propertyDetail';
import AddProperty from './components/addProperty';
import Login from './components/login';
import SignUp from './components/signup';
import RequestDetail from './components/requestDetail';
import AddRequest from './components/addRequest';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/property" exact component={Property} />
            <Route path="/property/:id" component={PropertyDetail} />
            <Route path="/add-property" component={AddProperty} />
            <Route path="/request" exact component={Request} />
            <Route path="/request/:id" component={RequestDetail} />
            <Route path="/add-request" component={AddRequest} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
