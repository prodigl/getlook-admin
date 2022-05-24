import React, { useEffect, useState } from "react";
import City from "../components/Filters/City";
import Day from "../components/Filters/Day";
import Owner from "../components/Filters/Owner";
import { gettingUserId } from "../functions/gettingUserId";
import { usingMap } from "../functions/usingMap";
import { days } from "../utils/day";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [val, setVal] = useState([]);

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
    if (filter.city === "") {
      const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
      const res = await fetch("http://3.6.36.102/allappointments/v1/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          date: days[0].value,
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
      setAppointments(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  // console.log(usingMap(appointments));

  useEffect(() => {
    const ftValue = usingMap(appointments);
    console.log("ftValue", ftValue);
    setVal(ftValue);
  }, []);

  return (
    <>
      {usingMap(appointments).map((item) => {
        const keys = Object.keys(item);
        const items = item[keys];
        {
          /* item[keys] ? "value" : "no value" */
        }
        {
          /* item[keys].map((item) => {
          {item.id}
        }) */
        }
        console.log("keyvalue", items);
      })}
    </>
  );
};

export default Dashboard;
