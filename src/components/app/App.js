import React from 'react';
import Navigation from './navigation';
import Home from './home';
import Property from '../property/property';
import PropertyDetail from '../property/propertyDetail';
import AddProperty from '../property/addProperty';
import Login from '../user/login';
import SignUp from '../user/signup';
import Request from '../request/request';
import RequestDetail from '../request/requestDetail';
import AddRequest from '../request/addRequest';

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
