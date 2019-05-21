import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import GuestForm from "./GuestForm.js";
import Card from "@material-ui/core/Card";
import GuestInput from "./GuestInput.js";
import SheetButton from "./SheetButton.js";
import Button from "@material-ui/core/Button";

class RestCardArg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardInfo: props,
      index: 0
    };

    this.leftChoose = this.leftChoose.bind(this);
    this.rightChoose = this.rightChoose.bind(this);
    this.getGuestList = this.getGuestList.bind(this);
  }

  getGuestList() {
    var cardId = this.state.cardInfo._id;
    console.log(cardId);
    axios
      .get("http://localhost:3001/createGuestSheet", {
        params: {
          cardId: cardId
        }
      })
      .then(function(response) {
        console.log("received");
        var sheetURL = response["data"]["spreadsheetID"];
        console.log(response["data"]["spreadsheetID"]);

        window.open("https://docs.google.com/spreadsheets/d/" + sheetURL);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  leftChoose() {
    var self = this;
    var index = this.state.index;
    var newIndex = Math.max(index - 1, 0);
    var requestIndex = { index: newIndex };

    axios
      .post("http://localhost:3001/invitationList", requestIndex)
      .then(function(response) {
        console.log(response);
        self.setState({ cardInfo: response.data, index: newIndex });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  rightChoose() {
    var self = this;
    var index = this.state.index;
    var newIndex = index + 1;
    var requestIndex = { index: newIndex };
    console.log("index: " + newIndex);

    axios
      .post("http://localhost:3001/invitationList", requestIndex)
      .then(function(response) {
        console.log(response);

        if (response.data != null) {
          self.setState({ cardInfo: response.data, index: newIndex });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    // let cardImage = require(this.state.image);

    return (
      <Router>
        <div>
          <Card className="CenterCard">
            <img src={this.state.cardInfo.image} className="RestImage" />

            <row className="CardText"> {this.state.cardInfo.Description}</row>

            <row className="CardText"> {this.state.cardInfo.Date} </row>

            <div className="ButtonDiv">
              <button className="LeftButton" onClick={this.leftChoose}>
                {" "}
                Left{" "}
              </button>
              <Link to="/entryForm">
                <button className="CardButton"> RSVP </button>
              </Link>
              <Route
                path="/entryForm"
                component={() => <GuestForm _id={this.state.cardInfo._id} />}
              />
              <button className="RightButton" onClick={this.rightChoose}>
                {" "}
                Right{" "}
              </button>
            </div>
          </Card>

          <Button onClick={this.getGuestList}>Get Guest List</Button>
        </div>
      </Router>
    );
  }
}

export default RestCardArg;
