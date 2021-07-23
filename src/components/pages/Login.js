import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAlert } from "../../../node_modules/react-alert/dist/cjs/react-alert";
import classNames from "classnames";
import { useForm } from "react-hook-form";

export const Login = (props) => {
  const WebAPIURL = props.WebAPIURL;
  let history = useHistory();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {

    const LoginModel = {
      UserId: data.username,
      Password: data.password,
    };

    await axios.post(WebAPIURL + "/api/auth/token", LoginModel).then(
      (response) => {
        console.log(response.data.returnSuccess);
        if (response.data.returnSuccess) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("webapiurl", WebAPIURL);
          localStorage.setItem("userid", response.data.id);

          history.push("/notice");
        }
      },
      (error) => {
        alert.show(error.response.data.error, {
          type: "error",
        });
      }
    );
  };

  return (
    <div className="container">
      <div className="mx-auto shadow p-5 mt-5" style={{ width: "40%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mt-2">
            <input
              autoFocus
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.username,
              })}
              name="username"
              placeholder="Enter User Name"
              {...register("username", {
                required: "User Name is required",
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              placeholder="Enter Password"
              className={classNames("form-control", {
                "is-invalid": errors.password,
              })}
              name="password"
              {...register("password", {
                required: "Password is required",
                maxLength: {
                  value: 15,
                  message: "Maximum length is 15 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <button className="btn btn-sm btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
