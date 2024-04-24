import { FunctionComponent } from "react";
// import Include from "./Include";
// import EllipseIcon from "./EllipseIcon";
// import Department from "./Department";
// import Hours from "./Hours";
import "../styles/FrameComponent.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <div className="hoursAreaInner">
      <div className="frameParent">
        <div className="includeParent">
          {/* <Include /> */}
          Include
          <div className="frameGroup">
            <div className="ellipseWrapper">
              <div className="frameChild" />
            </div>
            <div className="frameItem" />
            <div className="ellipseContainer">
              <div className="frameInner" />
            </div>
            <div className="ellipseFrame">
              <div className="ellipseDiv" />
            </div>
            {/* <EllipseIcon /> */}
            Ellipses
          </div>
        </div>
        <div className="departmentLabel">
          <div className="componentInstance">
            {/* <Department /> */}
            Dept
            {/* <Hours /> */}
            Hours
          </div>
        </div>
      </div>
    </div>
  );
    };

export default FrameComponent;