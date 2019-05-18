import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import RestCardCreator from "./RestCardCreator.js";

class CreateButton extends Component {
  constructor(props) {
    super(props);
    this.state = { description: null, img: null, date: null };
  }

  render() {
    return (
      <Router>
        <Link to="/cardCreator">
          <Button>Create Card</Button>
        </Link>
        <Route
          path="/cardCreator"
          component={RestCardCreator}
          image={this.state.image}
        />
      </Router>
    );
  }
}

export default CreateButton;
