import { useState } from "react";

// import API from "../api/service";

import { useNavigate } from "react-router-dom";
import API from "./api/service";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });


  // Handle change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  // Handle submit
 // Handle submit
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post(
      "/auth/login",
      formData
    );

    // Save token
    localStorage.setItem(
      "token",
      res.data.token
    );

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("Login Successful");

    // Role Based Navigation
    const user = res.data.user;

    if (
      user?.role?.toLowerCase() === "admin"
    ) {

      navigate("/dashboard");

    } else {

      navigate("/user-dashboard");

    }

  }
  catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};


  return (

    <div
      className="
      container
      mt-5
      "
    >

      <div
        className="
        row
        justify-content-center
        "
      >

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2
              className="
              text-center
              mb-4
              "
            >
              Login
            </h2>


            <form
              onSubmit={handleSubmit}
            >

              {/* Email */}
              <div className="mb-3">

                <label>
                  Email
                </label>

                <input

                  type="email"

                  name="email"

                  className="form-control"

                  onChange={handleChange}

                />

              </div>


              {/* Password */}
              <div className="mb-3">

                <label>
                  Password
                </label>

                <input

                  type="password"

                  name="password"

                  className="form-control"

                  onChange={handleChange}

                />

              </div>


              <button
                className="
                btn
                btn-primary
                w-100
                "
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;