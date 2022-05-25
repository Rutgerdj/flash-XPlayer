import React from "react";
import "./expandmenu.css";
import $ from "jquery";

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
        <div>start</div>
        <div>start</div>
      </div>
    );
  }
}
