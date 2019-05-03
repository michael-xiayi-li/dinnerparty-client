import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ramen from './ramen.jpg';
import './Board.css';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';
/*

FormLabel
FormHelperText
Input
InputLabel

*/




class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link to='/g'>
            Learn React
            </Link>
            <Route path='/g' component= {RestCard}>
            </Route>
          </a>
        </header>
      </div>
      </Router>
    );
  }
}


class HomePage extends Component{
  
  render(){
    return(
        <div>
        <RestCard></RestCard>
        <SheetButton></SheetButton>
        </div>

    );
  }


}


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

class RestCardCreator extends Component{
    constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', description: 'success',};
    }

  renderInput(i){
  
    return <GuestInput value={i}/>;
  }
  _handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
  }


 _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

    this.setState(() => ({
      ['file']: file,
      ['imagePreviewUrl']: reader.result
    }))

    
    }
 

    reader.readAsDataURL(file)
  }

  render(){
    
     let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return(

      <Card className = "CenterCard">
      
      <form onSubmit={(e)=>this._handleSubmit(e)} className="FormEntry">
      <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />

      {this.renderInput('Date')}
      {this.renderInput('Description')}


       <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>


            </form>
      </Card>
    )
  }
}

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



class GuestForm extends Component {
  

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




      <SubmitButton> </SubmitButton>

      </div>
      </Card>

    );

  }


 
}




class SubmitButton extends Component{
  


  handleClick = () => {
    

    var information = document.getElementsByClassName("Form Entry");
    


    var bodyFormData = {};
    for (var i = 0; i < information.length; i++) {
      var element = information[i];
      var inputLabel = element.getElementsByClassName("FormInputLabel")[0];
      var inputText = element.getElementsByClassName("FormData")[0];

      var inputLabelCategory = inputLabel.innerHTML.slice(0,-1);
      var inputTextResponse = inputText.children[0].children[0].value;
      bodyFormData[inputLabelCategory]=inputTextResponse;

    }
   console.log(bodyFormData);
    
    axios.post('http://localhost:3001/postForm', bodyFormData)
      .then(function (response) {
        console.log("received");
    console.log(response);
      })
      .catch(function (error) {
    console.log(error);
      });
  };


  render(){
    return (

      <Button onClick={this.handleClick}>
        Submit
      </Button>


    );




  }



}




class TestForm extends Component{
  
  render(){
    
    return(


      <form>
        <TextField
          name='title'
          label='Exercise'

          value = "meh"
          margin='normal' />
      </form>



    );




  }


}


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

export default RestCard;
//export default RestCardCreator;
