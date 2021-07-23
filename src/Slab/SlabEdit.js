import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory, useParams, Link } from "react-router-dom";
import { useAlert } from "../../node_modules/react-alert/dist/cjs/react-alert";
import classNames from "classnames";
import { Navbar } from "../Layout/Navbar";

export const SlabEdit = () => {
  const WebAPIURL = localStorage.getItem("webapiurl");
  let history = useHistory();
  const alert = useAlert();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  if (token == null) {
    history.push("/");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [slabs, setSlabs] = useState({
    slabID: 0,
    slabFrom: 0,
    slabTo: 0,
    slabs: "",
  });

  const [getSlabID, setGetSlabID] = useState(0);

  useEffect(() => {
    getSlab();
  }, []);

  const getSlab = async () => {
    const result = await axios.get(
      WebAPIURL + `/api/Slab/GetById?SlabID=${id}`,
      {
        headers: headers,
      }
    );
    setGetSlabID(result.data.slabID);
    setSlabs(result.data);
  };

  const { slabID, slabFrom, slabTo } = slabs;

  const onInputChange = (e) => {
    setSlabs({ ...slabs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    data.IsNoticeSlab = data.IsNoticeSlab == "Notice" ? "1" : "0";
    data.Slabs = data.slabFrom + "-" + data.slabTo;
    data.CreatedBy = userid;

    await axios
      .post(WebAPIURL + "/api/Slab/Insert", data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.result) {
          alert.show(response.data.message, {
            type: "success",
          });
          history.push("/slab");
        } else {
          alert.show(response.data.message, {
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <Navbar isValid="true" />
      <div className="container">
        <div className="mx-auto shadow p-5 mt-5" style={{ width: "40%" }}>
          <h2 className="text-center mb-4">Add Slab</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-2">
              <input
                {...register("IsNoticeSlab", { required: true })}
                type="radio"
                value="Notice"
                checked
              />
              <label style={{ padding: "10px" }}>Notice</label>
              <input
                {...register("IsNoticeSlab", { required: true })}
                type="radio"
                value="Telecalling"
              />
              <label style={{ padding: "10px" }}>Telecalling</label>
            </div>
            <div className="form-group mt-2">
              <input
                autoFocus
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.slabFrom,
                })}
                name="slabFrom"
                type="number"
                placeholder="Enter Slab From"
                {...register("slabFrom", {
                  required: "Slab From is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 1 characters",
                  },
                  maxLength: {
                    value: 3,
                    message: "Maximum length is 3 characters",
                  },
                })}
                value={slabFrom}
                onChange={(e) => onInputChange(e)}
              />
              {errors.slabFrom && (
                <div className="invalid-feedback">
                  {errors.slabFrom.message}
                </div>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.slabTo,
                })}
                name="slabTo"
                type="number"
                placeholder="Enter Slab To"
                {...register("slabTo", {
                  required: "Slab To is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 1 characters",
                  },
                  maxLength: {
                    value: 3,
                    message: "Maximum length is 3 characters",
                  },
                })}
                value={slabTo}
                onChange={(e) => onInputChange(e)}
              />
              {errors.slabTo && (
                <div className="invalid-feedback">{errors.slabTo.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-success btn-block mt-5">
              Update
            </button>
            <Link
              className="btn btn-warning mt-5"
              style={{ marginLeft: "10px" }}
              to="/slab"
            >
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
