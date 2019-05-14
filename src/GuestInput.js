import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';


class GuestInput extends Component{
  
  constructor(props) {
  super(props);
    
    this.state = {
      

      name: "ga",
    };
  
  }


  getName(){
    
    return "A";
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

    render(){
     return(

      <div className="Form Entry">
      <InputLabel className="FormInputLabel">
        {this.props.value}:
      </InputLabel>
      <TextField  value={this.state.name}
      onChange={this.handleChange('name')} className="FormData">
      </TextField>
      </div>

    );
    }


}

export default GuestInput;