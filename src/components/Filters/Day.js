import React from "react";
import { days } from "../../utils/day";

const Day = ({ value, onChange }) => {
  return (
    <>
      <div className="days">
        <label htmlFor="days">Choose a day:</label>
        <br />
        <select value={value} onChange={onChange} name="days" id="days">
          <option value={days[0].value}>All</option>
          {days.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.content} {item.value}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Day;
