import React, { useEffect, useState } from "react";

const Appoimentsapi = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
    const res = await fetch("http://3.6.36.102/allappointments/v1/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
        Accept: "application/json",
      },
      body: JSON.stringify({
        date: "2022-05-18",
      }),
    });
    const data = await res.json();
    setAppointments(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //getting unique city values
  const uniqueCity = [];

  appointments.map((item) => {
    uniqueCity.push(item.stylist.area.city);
  });
  const unique = [...new Set(uniqueCity)];
  console.log(uniqueCity);
  console.log(unique.sort());

  return <>Appoimentsapi</>;
};

export default Appoimentsapi;
