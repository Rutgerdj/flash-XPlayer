import React from "react";
import "./expandmenu.css";
import $ from "jquery";
import logoff from "images/start/logoff.png";
import shutoff from "images/start/shutoff.png";

export default class ExpandMenu extends React.Component {
  toggle() {
    console.log(this.menu.style.top);
    $(this.menu).toggle();
  }

  componentDidMount() {
    this.menu.style.top = `-${this.menu.scrollHeight}px`;
  }

  render() {
    return (
      <div id="expandStartMenu" ref={(m) => (this.menu = m)}>
        <div className="topsection">
          <span>
            Epic Gamer
          </span>
        </div>
        <div>
          <div className="column left">
          Left
          </div>
          <div className="column right">
          Right
          </div>
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
