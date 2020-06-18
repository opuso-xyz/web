import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SiteWrapper from './client/components/organisms/site-wrapper';
import HomePage from './client/pages/home';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import UserService from './client/services/userService';
import 'cross-fetch/polyfill';

export const serverUrl = process.env.SERVER_URI || 'http://localhost:4000';

export const apolloClient = new ApolloClient({
  uri: serverUrl
});

export const authService = new UserService();
authService.user.subscribe(user => {
  if (user) {
    console.log('Authorized');
  } else {
    console.log('Not Authorized');
  }
});
const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SiteWrapper>
        <Switch>
          <Route path="/settings">
            <p>Settings</p>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </SiteWrapper>
    </ApolloProvider>
  );
};

export default App;
