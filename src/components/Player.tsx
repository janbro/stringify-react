import React, { Component } from "react";
import "./Player.css";
import Song from '../models/Song';

class Player extends Component {
    state: any;
    playerCheckInterval: any;
    player: any;

    constructor(props: Song) {
        super(props);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
export default Player;