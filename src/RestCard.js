
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route,Redirect} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import GuestForm from './GuestForm.js';

class RestCard extends Component{


  constructor(props) {
  super(props);
    this.state = {
      image: 'ramen.jpg',
      description: "description for party",
      date: "08/04/1997",
    };
  }
   render(){

     // let cardImage = require(this.state.image);
  
      return (
        <Router>
        <Card className= "CenterCard">

          <img src = {this.state.image} className="RestImage"/>

        <row className="CardText"> {this.state.description}</row>

        <row className="CardText"> {this.state.date} </row>

        <Link to='/entryForm'>
        <button className="CardButton"> RSVP </button>
        </Link>
        <Route path = '/entryForm' component = {GuestForm} ></Route>
        </Card>
        </Router>


      );
   }
}

export default RestCard;