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
          date: "2022-05-27",
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

  const renderData = (app) => {
    const localAppointments = usingMap(app);
    let newAppointments = [];

    if (localAppointments && localAppointments?.length) {
      localAppointments?.map((item) => {
        Object.keys(item)?.map((key) => {
          // console.log(key);
          newAppointments.push(item[key]);
        });
      });
    }
    console.log("appointments", newAppointments);
    return newAppointments;
  };

  const memorizeData = useMemo(() => {
    const localData = renderData(appointments);
    console.log("localdata", localData);
    return loader
      ? "loading...."
      : Object.keys(localData).map((key) => {
          // console.log("dataitem", localData[key][1]);
          return (
            <tr key={key}>
              {localData[key].map((dataItem, index) => {
                console.log("dataitem", dataItem);

                return (
                  <>
                    <td>{dataItem.stylist.user.first_name}</td>
                    <td>
                      {dataItem.stylist.area.name}, {dataItem.stylist.area.city}
                    </td>
                    <td>{dataItem.date}</td>
                    <td>{dataItem.slot && dataItem.slot}</td>
                    <td>{dataItem.slot && dataItem.slot}</td>
                    <td>{dataItem.slot && dataItem.slot}</td>
                  </>
                );
              })}
            </tr>
          );
        });
  }, [appointments]);

  return (
    <>
      {loader ? (
        "loading...."
      ) : (
        <div className="container-fluid mt-5">
          <table className="table text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">Stylist</th>
                <th scope="col">Area</th>
                <th scope="col">Date</th>
                <th scope="col">Slot 1</th>
                <th scope="col">Slot 2</th>
                <th scope="col">Slot 3</th>
              </tr>
            </thead>
            <tbody>{memorizeData}</tbody>
          </table>
        </div>
      )}
      {/* {memorizeData} */}
    </>
  );
};

export default Appoimentsapi;
