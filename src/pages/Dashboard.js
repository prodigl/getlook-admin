import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Filter from "../components/Filter";
import City from "../components/Filters/City";
import Day from "../components/Filters/Day";
import Owner from "../components/Filters/Owner";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { filterContext } from "../context";
import { usingMap } from "../functions/usingMap";
import useFetch from "../hooks/useFetch";
import { days } from "../utils/day";

const Dashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (location.state === null) {
      navigate("/", { replace: false });
    }
  }, []);

  const [loader, setLoader] = useState(true);

  const [appointments, setAppointments] = useState([]);

  const [filter, setFilter] = useState({
    city: "",
    owner: "",
    days: days[0].value,
  });

  //THIS IS FOR CUSTOM HOOK, RIGHT NOW CUSTOM HOOK IS NOT WORKING PROPERLY
  // const [appointments, loader] = useFetch({
  //   url: "http://3.6.36.102/allappointments/v1/api",
  //   ...filter,
  // });

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
            date: filter.days,
            city: "Jodhpur",
          }),
        });
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.log("error: " + err);
      } finally {
        setLoader(false);
      }
    } else {
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
            date: filter.days,
            city: filter.city,
          }),
        });
        const data = await res.json();
        console.log("api data");
        setAppointments(data);
      } catch (e) {
        console.log("error: " + e);
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  console.log(usingMap(appointments));

  return (
    <>
      <Navbar value={filter} onChange={eventHandle} />

      <filterContext.Provider value={{ ...filter, eventHandle }}>
        <Filter />
      </filterContext.Provider>

      {/* //all filtered data */}
      {appointments && appointments.length != 0 ? (
        <div className="container-fluid table-container">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Stylist</th>
                <th scope="col">Area</th>
                <th scope="col">Date</th>
                <th scope="col">Slot 1</th>
                <th scope="col">Slot 2</th>
                <th scope="col">Slot 3</th>
              </tr>
            </thead>
            <tbody>
              {!loader ? (
                appointments.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.stylist.user.first_name}</td>
                      <td>
                        {item.stylist.area.name}, {item.stylist.area.city}
                      </td>
                      <td>{item.date}</td>
                      <td>
                        <Button text={item.slot === 1 ? "release" : "block"} />
                      </td>
                      <td>
                        <Button text={item.slot === 2 ? "release" : "block"} />
                      </td>
                      <td>
                        <Button text={item.slot === 3 ? "release" : "block"} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container-fluid d-flex justify-content-center align-items-center loader">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Dashboard;
