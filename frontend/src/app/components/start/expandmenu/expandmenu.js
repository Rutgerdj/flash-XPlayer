import React from "react";
import "./expandmenu.css";
import $ from "jquery";
import logoff from "images/start/logoff.png";
import shutoff from "images/start/shutoff.png";
import ProgramContext from "app/app/Contexts";
import { v4 as uuidv4 } from "uuid";
import OutsideClickHandler from "react-outside-click-handler";

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

const rightMenuItems = [
  {
    title: "My Documents",
    icon: "docs.png",
    href: null,
  },
  {
    title: "My Pictures",
    icon: "pics.png",
    href: null,
  },
  {
    title: "My computer",
    icon: "comp.png",
    href: null,
  },
  {
    break: true,
  },
  {
    title: "Control Panel",
    icon: "control.png",
    href: null,
  },
  {
    title: "Printers and Faxes",
    icon: "print.png",
    href: null,
  },
  {
    break: true,
  },
  {
    title: "Help and Support",
    icon: "help.png",
    href: "https://github.com/rutgerdj/flash-xplayer",
  },
  {
    title: "Search",
    icon: "search.png",
    href: "https://duckduckgo.com",
  },
];

export default class ExpandMenu extends React.Component {
  toggle() {
    $(this.menu).toggle();
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedProfilePicture: 0,
    };
  }

  componentDidMount() {
    this.menu.style.top = `-${this.menu.scrollHeight}px`;
    this.toggle();

    window.addEventListener("keyup", (ev) => {
      if (ev.keyCode === 17 || ev.keyCode === 91 || ev.metaKey) {
        this.toggle();
      }
    });
  }

  selectProfilePicture() {
    this.setState({
      selectedProfilePicture:
        (this.state.selectedProfilePicture + 1) % profile_pictures.length,
    });
  }

  rightItem(title, icon) {
    return (
      <div>
        <img width="20" height="20" alt="icon" src={`/images/icons/${icon}`} />
        <span>{title}</span>
      </div>
    );
  }

  render() {
    return (
      <ProgramContext.Consumer>
        {(value) => (
          <OutsideClickHandler
            onOutsideClick={(x) => {
              if (x.target.id !== "startButton") {
                $(this.menu).hide();
              }
            }}
          >
            <div id="expandStartMenu" ref={(m) => (this.menu = m)}>
              <div className="topsection">
                <img
                  width="40"
                  height="40"
                  onClick={() => this.selectProfilePicture()}
                  src={`/images/profile_pictures/${
                    profile_pictures[this.state.selectedProfilePicture]
                  }`}
                  alt="profilepicture"
                />
                <span>Epic Gamer</span>
              </div>
              <div className="programItems">
                <div className="column left">
                  {value.availableApps.map((app) => (
                    <div
                      key={uuidv4()}
                      className="programItem"
                      onClick={() => {
                        value.addWindow(app);
                        $(this.menu).hide();
                      }}
                    >
                      <div>
                        <img
                          src={app.icon}
                          width="20"
                          height="20"
                          alt={app.name}
                        />
                        <span title={app.title}>{app.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="column right">
                  {rightMenuItems.map((item) => (
                    <div key={uuidv4()} className="programItem">
                      {item.break ? (
                        <hr />
                      ) : item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {this.rightItem(item.title, item.icon)}
                        </a>
                      ) : (
                        this.rightItem(item.title, item.icon)
                      )}
                    </div>
                  ))}
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
          </OutsideClickHandler>
        )}
      </ProgramContext.Consumer>
    );
  }
}
