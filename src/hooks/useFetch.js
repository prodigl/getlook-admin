import React, { useState, useEffect, useCallback } from "react";

const useFetch = ({ url, ...filter }) => {
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(true);

  console.log(filter);

  const fetchData = useCallback(async () => {
    if (filter.city === "" || filter.days === "") {
      const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
      try {
        setLoader(true);
        const res = await fetch(url, {
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
      } catch (e) {
        console.log(e);
      } finally {
        setLoader(false);
      }
    } else {
      const token = "208dede9eaa9acc3bc05cb7aee895776cfc1c71b";
      try {
        setLoader(true);
        const res = await fetch(url, {
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
      } catch (e) {
        console.log(e);
      } finally {
        setLoader(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return [appointments, loader];
};

export default useFetch;
