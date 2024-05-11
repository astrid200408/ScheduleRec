import React from "react";

/*
Class that contains the html components that form the Mon-Fri schedule design
*/

interface ScheduleInterface {
  mString: string[];
  tuString: string[];
  wString: string[];
  thString: string[];
  fString: string[];
}
export default function Schedule(props: ScheduleInterface) {
  return (
    <div className="back-rectangle">
      <div
        className="monbox"
        aria-label="monday box"
        aria-description="box containing Monday class"
      >
        <p className="monPar">
          {props.mString[0] && (
            <React.Fragment>
              {props.mString[0]}
              <br />
              {props.mString[1]}
              <br />
              {props.mString[2]}:{props.mString[3]} - {props.mString[4]}:
              {props.mString[5]}
              <br />
              {props.mString[6]}
            </React.Fragment>
          )}
        </p>
      </div>
      <div
        className="tuesbox"
        aria-label="tuesday box"
        aria-description="box containing Tuesday class"
      >
        <p className="tuesPar">
          {props.tuString[0] && (
            <React.Fragment>
              {props.tuString[0]}
              <br />
              {props.tuString[1]}
              <br />
              {props.tuString[2]}:{props.tuString[3]} - {props.tuString[4]}:
              {props.tuString[5]}
              <br />
              {props.tuString[6]}
            </React.Fragment>
          )}
        </p>
      </div>
      <div
        className="wedbox"
        aria-label="wednesday box"
        aria-description="box containing Wednesday class"
      >
        <p className="wedPar">
          {props.wString[0] && (
            <React.Fragment>
              {props.wString[0]}
              <br />
              {props.wString[1]}
              <br />
              {props.wString[2]}:{props.wString[3]} - {props.wString[4]}:
              {props.wString[5]}
              <br />
              {props.wString[6]}
            </React.Fragment>
          )}
        </p>
      </div>
      <div
        className="thursbox"
        aria-label="thursday box"
        aria-description="box containing Thursday class"
      >
        <p className="thursPar">
          {props.thString[0] && (
            <React.Fragment>
              {props.thString[0]}
              <br />
              {props.thString[1]}
              <br />
              {props.thString[2]}:{props.thString[3]} - {props.thString[4]}:
              {props.thString[5]}
              <br />
              {props.thString[6]}
            </React.Fragment>
          )}
        </p>
      </div>
      <div
        className="fribox"
        aria-label="friday box"
        aria-description="box containing Friday class"
      >
        <p className="friPar">
          {props.fString[0] && (
            <React.Fragment>
              {props.fString[0]}
              <br />
              {props.fString[1]}
              <br />
              {props.fString[2]}:{props.fString[3]} - {props.fString[4]}:
              {props.fString[5]}
              <br />
              {props.fString[6]}
            </React.Fragment>
          )}
        </p>
      </div>
    </div>
  );
}
