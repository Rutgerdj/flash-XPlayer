import default_btn from "../../../images/start/default.png";
import click_btn from "../../../images/start/click.png";
import hover_btn from "../../../images/start/hover.png";
import "./start.css";

export default function StartMenu() {
  return (
    <div>
      <img
        alt="startbutton"
        src={default_btn}
        id="startButton"
        onMouseEnter={(e) => (e.target.src = hover_btn)}
        onMouseLeave={(e) => (e.target.src = default_btn)}
        onMouseDown={(e) => (e.target.src = click_btn)}
        onMouseUp={(e) => (e.target.src = default_btn)}
      />
    </div>
  );
}
