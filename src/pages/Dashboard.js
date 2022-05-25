import React, { useEffect, useState } from "react";
import City from "../components/Filters/City";
import Day from "../components/Filters/Day";
import Owner from "../components/Filters/Owner";
import { gettingUserId } from "../functions/gettingUserId";
import { usingMap } from "../functions/usingMap";
import { days } from "../utils/day";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const [filter, setFilter] = useState({
    city: "",
    owner: "",
    days: days[0].value,
  });

  const eventHandle = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const fetchData = async () => {
    if (filter.city === "" || filter.days === "") {
      const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
      const res = await fetch("http://3.6.36.102/allappointments/v1/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          date: filter.days,
          city: "Jodhpur",
        }),
      });
      const data = await res.json();
      setAppointments(data);
    } else {
      const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
      const res = await fetch("http://3.6.36.102/allappointments/v1/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          date: filter.days,
          city: filter.city,
        }),
      });
      const data = await res.json();
      console.log("api data");
      setAppointments(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  console.log(usingMap(appointments));

  return (
    <>
      <div className="container-fluid d-flex justify-content-evenly">
        <p>
          <b>data length: </b>
          {appointments.length}
        </p>

        {/* city filter */}
        <City value={filter.city} onChange={eventHandle} />

        {/* owner filter */}
        <Owner value={filter.owner} onChange={eventHandle} />

        {/* days filter */}
        <Day value={filter.days} onChange={eventHandle} />
      </div>

      {/* //all filtered data */}
      {appointments.length != 0 ? (
        <div className="container-fluid mt-5">
          <table className="table text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Stylist</th>
                <th scope="col">Stylist Id</th>
                <th scope="col">Area</th>
                <th scope="col">Date</th>
                <th scope="col">Slot 1</th>
                <th scope="col">Slot 2</th>
                <th scope="col">Slot 3</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.stylist.user.first_name}</td>
                    <td>{item.stylist.id}</td>
                    <td>
                      {item.stylist.area.name}, {item.stylist.area.city}
                    </td>
                    <td>{item.date}</td>
                    <td>{item.slot === 1 ? item.slot : "free"}</td>
                    <td>{item.slot === 2 ? item.slot : "free"}</td>
                    <td>{item.slot === 3 ? item.slot : "free"}</td>
                    <td>{item.stylist.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container-fluid text-center">
          <p>No Data Found</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
