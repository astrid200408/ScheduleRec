import { FunctionComponent } from "react";
// import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
// import Save from "../components/Save";
// import mainpage from "../styles/mainpage.css";
import "../styles/mainpage.css";

const MainPage: FunctionComponent = () => {
  return (
    <div className="mainPage">
      {/* <FrameComponent1 /> */}
      FramejComp1
      <main className="departmentComponent">
        <section className="hoursArea">
          <FrameComponent />
          <div className="saveButtons">
            <div className="coursesParent">
              <img className="coursesIcon" alt="" src="/courses@2x.png" />
              <div className="vectorParent">
                <img
                  className="frameChild"
                  loading="lazy"
                  alt=""
                  src="/rectangle-22.svg"
                />
                <div className="frameItem" />
                <div className="frameInner" />
                <div className="rectangleDiv" />
                <div className="frameChild1" />
                <div className="frameChild2" />
              </div>
            </div>
            <div className="saveComponents">
              {/* <Save /> */}
              Save
            </div>
          </div>
        </section>
      </main>
    </div>
  );}

export default MainPage;