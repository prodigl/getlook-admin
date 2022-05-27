import React from "react";
import { cities } from "../../utils/city";

const City = ({ value, onChange }) => {
  return (
    <>
      <div className="filter">
        <label htmlFor="cities">City:</label>
        <br />
        <select value={value} onChange={onChange} name="city" id="cities">
          <option value="">All</option>
          {cities.sort().map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default City;
