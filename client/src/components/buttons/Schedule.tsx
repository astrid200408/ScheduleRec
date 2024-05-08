import React from "react";

/*
Class that contains the html components that form the Mon-Fri schedule design
*/

interface ScheduleInterface {
    mString: string;
    tuString: string;
    wString: string;
    thString: string;
    fString: string;
}
export default function Schedule(
  props:ScheduleInterface
) {

return (
        <div className="back-rectangle">
          <div
            className="monbox"
            aria-label="monday box"
            aria-description="box containing Monday class"
          >
            <p className="monPar">{props.mString}</p>
          </div>
          <div
            className="tuesbox"
            aria-label="tuesday box"
            aria-description="box containing Tuesday class"
          >
            <p className="tuesPar">{props.tuString}</p>
          </div>
          <div
            className="wedbox"
            aria-label="wednesday box"
            aria-description="box containing Wednesday class"
          >
            <p className="wedPar">{props.wString}</p>
          </div>
          <div
            className="thursbox"
            aria-label="thursday box"
            aria-description="box containing Thursday class"
          >
            <p className="thursPar">{props.thString}</p>
          </div>
          <div
            className="fribox"
            aria-label="friday box"
            aria-description="box containing Friday class"
          >
            <p className="friPar">{props.fString}</p>
          </div>
        </div>
    );
}