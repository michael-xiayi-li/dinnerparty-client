
import React, { Component } from 'react';
import TypeFormInvite from './TypeFormInvite.js';
import {BrowserRouter as Router, Link, Route,Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class ProfileButton extends Component{
  render(){

    return (

      <Router>

      <Link to = '/profileInput'>
      <Button >Make A Profile</Button></Link>
      <Route path ='/profileInput' component={TypeFormInvite}></Route>
      </Router>
    );
  }

}

export default ProfileButton;