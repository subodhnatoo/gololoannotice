import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory, useParams, Link } from "react-router-dom";
import { useAlert } from "../../node_modules/react-alert/dist/cjs/react-alert";
import classNames from "classnames";
import { Navbar } from "../Layout/Navbar";

export const NoticeEdit = () => {
  const WebAPIURL = localStorage.getItem("webapiurl");
  let history = useHistory();
  const alert = useAlert();
  const { id } = useParams();

  const token = localStorage.getItem("token");
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

  const [notices, setNotices] = useState({
    noticeID: 0,
    notice: "",
    charges: "",
    sortOrder: "",
  });

  const [getNoticeID, setGetNoticeID] = useState(0);

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    const result = await axios.get(
      WebAPIURL + `/api/Notice/GetById?NoticeID=${id}`,
      {
        headers: headers,
      }
    );
    setGetNoticeID(result.data.noticeID);
    setNotices(result.data);
  };

  const { noticeID, notice, charges, sortOrder } = notices;

  const onInputChange = (e) => {
    setNotices({ ...notices, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    let updateNotice = {
      noticeID: getNoticeID.toString(),
      notice: data.notice.toString(),
      charges: data.charges.toString(),
      sortOrder: data.sortOrder.toString(),
    };

    await axios
      .post(WebAPIURL + "/api/Notice/Update", updateNotice, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.result) {
          alert.show(response.data.message, {
            type: "success",
          });
          history.push("/notice");
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
          <h2 className="text-center mb-4">Edit Notice</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-2">
              <input
                autoFocus
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.notice,
                })}
                name="notice"
                placeholder="Enter Notice"
                {...register("notice", {
                  required: "Notice is required",
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum length is 30 characters",
                  },
                })}
                value={notice}
                onChange={(e) => onInputChange(e)}
              />
              {errors.notice && (
                <div className="invalid-feedback">{errors.notice.message}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.charges,
                })}
                id="charges"
                name="charges"
                placeholder="Enter Charges"
                type="number"
                {...register("charges", {
                  required: "Charges is required",
                  maxLength: {
                    value: 8,
                    message: "Maximum length is 8 digits",
                  },
                  min: {
                    value: 1,
                    message: "Should be greater than 0",
                  },
                  max: {
                    value: 1000,
                    message: "Should be less than 1000",
                  },
                })}
                value={charges}
                onChange={(e) => onInputChange(e)}
              />
              {errors.charges && (
                <div className="invalid-feedback">{errors.charges.message}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.sortOrder,
                })}
                id="sortOrder"
                name="sortOrder"
                type="number"
                placeholder="Enter Sort Order"
                value={sortOrder}
                {...register("sortOrder", {
                  required: "Sort Order is required",
                  min: {
                    value: 1,
                    message: "Minimum value should be 1",
                  },
                  max: {
                    value: 10,
                    message: "Maxmimum value should be 10",
                  },
                })}
                onChange={(e) => onInputChange(e)}
              />
              {errors.sortOrder && (
                <div className="invalid-feedback">
                  {errors.sortOrder.message}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-success btn-block mt-5">
              Update
            </button>
            <Link
              className="btn btn-warning mt-5"
              style={{ marginLeft: "10px" }}
              to="/notice"
            >
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
