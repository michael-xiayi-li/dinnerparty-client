

import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class SheetButton extends Component{
  
    handleClick(){
    axios.get('http://localhost:3001/createGuestSheet')
      .then(function (response) {

        console.log("received");
        var sheetURL = response['data']['spreadsheetID'];
        console.log(response['data']['spreadsheetID']);

        window.open("https://docs.google.com/spreadsheets/d/"+ sheetURL);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  render(){
    
    return (

      <Button onClick={this.handleClick}>Get Guest List</Button>
    );
  }
}

export default SheetButton;