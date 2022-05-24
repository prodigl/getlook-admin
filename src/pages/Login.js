import React, { useEffect, useState } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});

  //getting form data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const eventHandle = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const fetchLoginDetails = async (e) => {
    e.preventDefault();

    // const { username, password } = loginData;

    try {
      const res = await fetch("http://3.6.36.102/adminuser/v1/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.successCode === 4001) {
        //set login details into variable
        setLoginDetails(data);

        // redirect to admin dashboard page
        console.log(data.successMsg);
      } else if (data.errorCode === 1001) {
        console.log("only allowed for admin user");
      } else if (data.errorCode === 1002) {
        console.log(data.errorMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div>
              <div className="mb-4">
                <h1>Admin Login</h1>
              </div>
              <p>{loginData.username}</p>
              <p>{loginData.password}</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={loginData.username}
                    onChange={eventHandle}
                    name="username"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={loginData.password}
                    onChange={eventHandle}
                    name="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={fetchLoginDetails}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
