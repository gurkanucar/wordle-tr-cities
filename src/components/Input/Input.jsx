import React from "react";
import "./Input.css";
export const Input = (props) => {
  return (
    <div className="input-div">
      <input
        value={props.value}
        onChange={props.onChangeInput}
        className="input"
        list="cities"
        placeholder="city..."
        type="text"
      />
      <datalist id="cities">
        {props.cities.map((city, index) => {
          return <option key={city.plate} id={city.plate} value={city.name} />;
        })}
      </datalist>
    </div>
  );
};
