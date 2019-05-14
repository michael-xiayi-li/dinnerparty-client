import React, { Component } from 'react';
import RestCard from './RestCard.js';
import SheetButton from './SheetButton.js';
import ProfileButton from './ProfileButton.js';
import GetButton from './GetButton.js';
import ramen from './ramen.jpg';
import './Board.css';


class HomePage extends Component{
  
  render(){
    return(
        <div>
        <div id='centerDisplay'>
        <RestCard></RestCard>
        <ProfileButton></ProfileButton>
        </div>
        <div>
        <SheetButton></SheetButton>
        <GetButton></GetButton>
        </div>
        </div>

    );
  }

}
export default HomePage;

