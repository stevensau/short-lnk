import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup', '/login']
const authenticatedPages = ['/links']

const onEnterPublicPage = () => {
  console.log(Meteor.userId());
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/signup');
  }
}
export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.replace('/links');
  }else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/signup');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="/login" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="*" component={NotFound} />
  </Router>
)
