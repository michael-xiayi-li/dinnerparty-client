import React, { Component } from "react";
import RestCard from "./RestCard.js";
import SheetButton from "./SheetButton.js";
import ProfileButton from "./ProfileButton.js";
import CreateButton from "./CreateButton.js";
import GetButton from "./GetButton.js";
import ramen from "./ramen.jpg";
import "./Board.css";

import RestCardCreator from "./RestCardCreator.js";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div id="centerDisplay">
                    <RestCard />
                    <ProfileButton />
                </div>
                <div>
                    <CreateButton />
                    <GetButton />
                </div>
            </div>
        );
    }
}
//export default RestCardCreator;
export default HomePage;
