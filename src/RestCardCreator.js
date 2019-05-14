


import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route,Redirect} from 'react-router-dom';
import GuestForm from './GuestForm.js';
import GuestInput from './GuestInput.js';
import Card from '@material-ui/core/Card';
import FormData from 'form-data';

class RestCardCreator extends Component{
    constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', description: 'success',};
    }

  renderInput(i){
  
    return <GuestInput value={i}/>;
  }


  uploadInvitationCard(){

    let bodyFormData = new FormData();
    var information = document.getElementsByClassName("Form Entry");

    
    for (var i = 0; i < information.length; i++) {
      var element = information[i];
      var inputLabel = element.getElementsByClassName("FormInputLabel")[0];
      var inputText = element.getElementsByClassName("FormData")[0];

      var inputLabelCategory = inputLabel.innerHTML.slice(0,-1);
      var inputTextResponse = inputText.children[0].children[0].value;
      
      bodyFormData.append(inputLabelCategory, inputTextResponse);
      //bodyFormData[inputLabelCategory]=inputTextResponse;

    }

    //bodyFormData['image']=this.state.imagePreviewUrl;
    bodyFormData.append('image',this.state.imagePreviewUrl);
    //bodyFormData['file']=this.state.file;
    console.log('xxxxx');
    console.log(bodyFormData)
    console.log('xxxxx');

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    axios.post('http://localhost:3001/postRestCardCreator', bodyFormData, config)
      .then(function (response) {
        console.log("received");
        console.log(response);
      })
      .catch(function (error) {
    console.log(error);
      });



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
            //onClick={(e)=>this._handleSubmit(e)}>Upload Invitation</button>
            onClick={(e)=>this.uploadInvitationCard()}>Upload Invitation</button>

            </form>
      </Card>
    )
  }
}

export default RestCardCreator;