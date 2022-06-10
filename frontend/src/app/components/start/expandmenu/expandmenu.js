import React from "react";
import "./expandmenu.css";
import $ from "jquery";
import logoff from "images/start/logoff.png";
import shutoff from "images/start/shutoff.png";

const profile_pictures = [
  "airplane.jpg",
  "astronaut.jpg",
  "ball.jpg",
  "beach.jpg",
  "car.jpg",
  "cat.jpg",
  "chess.jpg",
  "dog.jpg",
  "drip.jpg",
  "duck.jpg",
  "fish.jpg",
  "guest.jpg",
  "guitar.jpg",
  "kick.jpg",
  "lift_off.jpg",
  "red_flower.jpg",
  "snowflake.jpg",
];

export default class ExpandMenu extends React.Component {
  toggle() {
    $(this.menu).toggle();
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedProfilePicture: profile_pictures[0],
    };

    console.log(this.state);
  }

  componentDidMount() {
    this.menu.style.top = `-${this.menu.scrollHeight}px`;
    $(this.menu).toggle();
  }

  selectProfilePicture() {
    let random = Math.floor(Math.random() * profile_pictures.length);
    this.setState({ selectedProfilePicture: profile_pictures[random] });
  }

  render() {
    return (
      <div id="expandStartMenu" ref={(m) => (this.menu = m)}>
        <div className="topsection">
          <img
            width="40"
            height="40"
            onClick={() => this.selectProfilePicture()}
            src={`/images/profile_pictures/${this.state.selectedProfilePicture}`}
            alt="profilepicture"
          />
          <span>Epic Gamer</span>
        </div>
        <div>
          <div className="column left">Left</div>
          <div className="column right">Right</div>
        </div>
        <div className="bottomsection">
          <div className="bottomButtons">
            <div>
              <img id="logoffbutton" width="30" src={logoff} alt="" />
              <span>Log off</span>
            </div>

            <div>
              <img id="shutoffbutton" width="30" src={shutoff} alt="" />
              <span>Shut Down</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
