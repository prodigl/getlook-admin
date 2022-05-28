import React, { useEffect, useState, useMemo } from "react";
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
import { format } from 'date-fns'


const Dashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (location.state === null) {
      navigate("/", { replace: false });
    }
  }, []);

  const [loader, setLoader] = useState(true);
  const [localDataa, setLocalData] = useState("");
  const [name, setName] = useState([]);
  const [area, setArea] = useState([]);
  const [joinDate, setJoinDate] = useState([]);
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

  console.log('appointments', appointments);

  const renderData = (app) => {
    const localAppointments = usingMap(app);
    let newAppointments = [];

    if (localAppointments && localAppointments?.length) {
      localAppointments?.map((item) => {
        Object.keys(item)?.map((key) => {
          newAppointments.push(item[key]);
        });
      });
    }
    console.log("appointments", newAppointments);
    return newAppointments;
  };

  const memorizeData = useMemo(() => {
    const localData = renderData(appointments);
    setLocalData(localData);
  }, [appointments]);

  //Adding name 
  useEffect(() => {
    let vita = [];
    Object.keys(localDataa).map((key) => {
      const val = Object.values(localDataa[key]);
      const tname = [
        ...new Set(val.map((item) => item?.stylist?.user?.first_name)),
      ];
      vita.push(tname);
    });
    setName(vita);
  }, [localDataa]);

  //Adding Address 
  useEffect(() => {
    let address = [];
    Object.keys(localDataa).map((key) => {
      const val = Object.values(localDataa[key]);
      const tname = [
        ...new Set(val.map((item) => item?.stylist?.address)),
      ];
      address.push(tname);
    });
    setArea(address);
    console.log(area)
  }, [localDataa]);

  //Adding Date 
  useEffect(() => {
    let date = [];
    Object.keys(localDataa).map((key) => {
      const val = Object.values(localDataa[key]);
      const tname = [
        ...new Set(val.map((item) => item?.stylist?.user?.date_joined)),
      ];
      date.push(tname);
    });
    setJoinDate(date);
  }, [localDataa]);

  // address
  // date_joined
  // console.log('using map',usingMap(appointments));

  return (
    <>
      <Navbar value={filter} onChange={eventHandle} />

      <filterContext.Provider value={{ ...filter, eventHandle }}>
        <Filter />
      </filterContext.Provider>

      {/* //all filtered data */}
      {localDataa && localDataa.length != 0 ? (
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

              {
                Object.keys(localDataa).map((key, index) => {
                  console.log('object', Object.keys(localDataa));
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{name[key]}</td>
                      <td>{area[key]}</td>
                      <td>
                        {
                          format(new Date(joinDate[key]), 'dd.MM.yyyy')
                        }
                      </td>
                      {localDataa[key].map((dataItem, index) => {
                        console.log('localDataa[key]',localDataa[key])
                        return (
                          <>
                            <td>
                              {
                                dataItem.slot === 1 ? dataItem.slot :
                                  dataItem.slot === 2 ? dataItem.slot :
                                    dataItem.slot === 3 ? dataItem.slot : "free"
                              }
                            </td>
                            {/* <td>hello</td> */}


                          </>
                        );
                      })}

                    </tr>
                  );
                })}


              {/* {memorizeData} */}
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
