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
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const cardStyles = {
  content: {
    left: "50%",
    right: "auto"
  }
};

class RestCardArg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardInfo: props,
      index: 0,
      modalIsOpen: false
    };

    this.leftChoose = this.leftChoose.bind(this);
    this.rightChoose = this.rightChoose.bind(this);
    this.getGuestList = this.getGuestList.bind(this);
    this.setCardDetails = this.setCardDetails.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    let nextState = this.state;
    nextState.modalIsOpen = true;
    this.setState(nextState);
  }
  afterOpenModal() {}
  closeModal() {
    let nextState = this.state;
    nextState.modalIsOpen = false;
    this.setState(nextState);
  }

  setCardDetails() {
    var self = this;
    axios
      .get("http://localhost:3001/invitationCard")
      .then(function(response) {
        console.log(response);
        self.setState(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    return (
      <ResponsiveContainer width={500} height={320}>
        <div>
          <Card className="CenterCard">
            <img src={this.state.cardInfo.image} className="RestImage" />

            <row className="CardText"> {this.state.cardInfo.Description}</row>

            <row className="CardText"> {this.state.cardInfo.Date} </row>

            <button className="LeftButton" onClick={this.leftChoose}>
              {" "}
              Left{" "}
            </button>
            <button className="CardButton" onClick={this.openModal}>
              {" "}
              RSVP{" "}
            </button>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <GuestForm
                _id={this.state.cardInfo._id}
                close={this.closeModal}
              />
            </Modal>
            <button className="RightButton" onClick={this.rightChoose}>
              {" "}
              Right{" "}
            </button>
          </Card>
          <Button onClick={this.getGuestList}>Get Guest List</Button>
        </div>
      </ResponsiveContainer>
    );
  }
}

export default RestCardArg;
