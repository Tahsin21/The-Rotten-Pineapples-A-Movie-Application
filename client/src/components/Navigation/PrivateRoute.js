import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Landing from '../Landing';
import SearchPage from '../Search';
import CustomPage from '../CustomPage';
import Reviews from '../Reviews'

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path = "/" exact component = {Landing} />
      <Route path = "/Review" exact component = {Reviews} />
      <Route path = "/Search" exact component = {SearchPage} />
      <Route path = "/myPage" exact component = {CustomPage} /> 
      </Switch>
    </Router>
  );
}

