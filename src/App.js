import React from 'react';
import './App.css';
import Home from './Home';
import { Route, useHistory } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Login from './Login';

import { oktaAuthConfig, oktaSignInConfig } from './config';


const oktaAuth = new OktaAuth(oktaAuthConfig);



const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function () {
    history.push('/login')
  }
  return (
    <div className="App">
      <div className="page">
        <div className="content">
          <Security oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}
            onAuthRequired={onAuthRequired}>
            <SecureRoute path='/groups' exact={true} component={GroupList} />
            <Route exact path="/" component={Home} />
            <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
            <Route path='/groups/:id' component={GroupEdit} />
            <Route path='/implicit/callback' component={LoginCallback} />
          </Security>
        </div>
      </div>
    </div>
  )
}

export default App;