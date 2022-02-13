import React from "react";
import "./Box.css";
export const Box = (props) => {
  const { city, distance, direction, color } = props.data;
  return (
    <div className="box" style={{ backgroundColor: color ? color : "white" }}>
      <div className="box-row">
        <p>{city}</p>
        <p>{distance}</p>
        <p>{direction}</p>
      </div>
    </div>
  );
};
