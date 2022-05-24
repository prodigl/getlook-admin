import React from "react";
import { owner } from "../../utils/owner";

const Owner = ({ value, onChange }) => {
  return (
    <>
      <div className="owner">
        <label htmlFor="owners">Choose a owner:</label>
        <br />
        <select value={value} onChange={onChange} name="owner" id="owners">
          <option value="">All</option>
          {owner.sort().map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Owner;
