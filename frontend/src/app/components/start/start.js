import default_btn from "../../../images/start/default.png";
import click_btn from "../../../images/start/click.png";
import hover_btn from "../../../images/start/hover.png";
import "./start.css";
import React from "react";
import ExpandMenu from "./expandmenu/expandmenu";

export default class StartMenu extends React.Component {
  toggle() {
    this.menu.toggle();
  }

  render() {
    return (
      <div id="startMenu">
        <ExpandMenu ref={(x) => (this.menu = x)} />
        <img
          alt="startbutton"
          src={default_btn}
          id="startButton"
          onMouseEnter={(e) => (e.target.src = hover_btn)}
          onMouseLeave={(e) => (e.target.src = default_btn)}
          onMouseDown={(e) => (e.target.src = click_btn)}
          onMouseUp={(e) => (e.target.src = default_btn)}
          onClick={() => this.toggle()}
        />
      </div>
    );
  }
}
