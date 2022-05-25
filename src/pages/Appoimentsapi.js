import React, { useEffect, useState, useMemo } from "react";
import { usingMap } from "../functions/usingMap";

const Appoimentsapi = () => {
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchData = async () => {
    const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
    try {
      setLoader(true);

      const res = await fetch("http://3.6.36.102/allappointments/v1/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          date: "2022-05-25",
          city: "Jodhpur",
        }),
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderData = async (app) => {
    const localAppointments = await usingMap(app);
    let newAppointments = [];

    if (localAppointments && localAppointments?.length) {
      localAppointments?.map((item) => {
        Object.keys(item)?.map((key) => {
          // if condition then return table
          console.log('key',key);

          newAppointments.push(item[key]);
        });
      });
    }
    console.log(newAppointments);
    return newAppointments;
  };

  const memorizeData = useMemo(() => {
    const localData = renderData(appointments);
    // console.log(localData);
    return loader ? "loading...." : "check result";
  }, [appointments]);

  return (
    <>
      {loader ? "loading...." : memorizeData}
      {/* {memorizeData} */}
    </>
  );
};

export default Appoimentsapi;
