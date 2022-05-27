import React, { useContext } from "react";
import { filterContext } from "../../context";
import City from "../Filters/City";
import Day from "../Filters/Day";
import Owner from "../Filters/Owner";

const Filter = () => {
  const { ...filter } = useContext(filterContext);
  const { eventHandle } = useContext(filterContext);
  return (
    <>
      <div className="container-fluid filter-container">
        <div className="row mx-0">
          <div className="col-12 col-lg-4 my-2 my-md-0">
            {/* city filter */}
            <City value={filter.city} onChange={eventHandle} />
          </div>
          <div className="col-12 col-lg-4 my-2 my-md-0">
            {/* owner filter */}
            <Owner value={filter.owner} onChange={eventHandle} />
          </div>
          <div className="col-12 col-lg-4 my-2 my-md-0">
            {/* days filter */}
            <Day value={filter.days} onChange={eventHandle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
