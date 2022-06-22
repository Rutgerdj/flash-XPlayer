import React from "react";
import ruffle from "app/app/Ruffle";
import AppWindow from "../basewindow/basewindow";
import "./gamewindow.css";

export default class SwfWindow extends AppWindow {
  constructor(props) {
    super(props);
    this.player = ruffle.createPlayer();
    this.sr = this.player.shadowRoot;
  }

  setSelf = (el) => {
    this.container = el;
    if (el) {
      this.container.appendChild(this.player);
    }
  };

  onResize(x, y) {
    super.onResize();
    if (this.canvas) {
      this.canvas.width = x - 20;
      this.canvas.height = y - 50;
    }
  }

  minimize() {
    this.player.pause();
    super.minimize();
  }

  componentDidMount() {
    super.componentDidMount();
    this.player.load({
      url: `/games/${this.props.obj.title}/game.swf`,
      allowScriptAccess: true,
      letterbox: "on",
      base: `/games/${this.props.obj.title}/files`,
    });

    this.player.addEventListener("loadeddata", (ev) => {
      this.canvas = this.sr.querySelector("canvas");
      var style = document.createElement("style");
      style.innerHTML =
        "#container {overflow: unset;} #container canvas {width: unset; height: unset;}";
      this.sr.appendChild(style);
    });
  }

  childComp() {
    return <div className="gamewindow" ref={this.setSelf}></div>;
  }
}
