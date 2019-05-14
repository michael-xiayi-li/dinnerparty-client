import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import SubmitButton from './SubmitButton.js';
import GuestInput from './GuestInput.js';
import Card from '@material-ui/core/Card';

class GuestForm extends Component {
  

  constructor(props){
    super(props);
  }

  renderInput(i){
    
    return <GuestInput value={i}/>;
  }


  render(){

    return (

      <Card className="CenterCard">


      <div className="FormEntry">

      <FormLabel className="FormTitle">

      Test
      </FormLabel>




      {this.renderInput("Name")}


        
      {this.renderInput("E-mail")}
      {this.renderInput("Dietary Restrictions")}




      <SubmitButton id= {this.props._id}> </SubmitButton>

      </div>
      </Card>
    );
  } 
}

export default GuestForm;