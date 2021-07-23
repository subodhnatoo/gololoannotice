import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import { Navbar } from "../Layout/Navbar";

export const NoticeView = () => {
  const WebAPIURL = localStorage.getItem("webapiurl");
  let history = useHistory();
  const token = localStorage.getItem("token");
  if (token == null) {
    history.push("/");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const [notice, setNotice] = useState({
    notice: "",
    charges: "",
    sortOrder: "",
  });
  const { id } = useParams();
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
    setNotice(result.data);
  };

  return (
    <>
      <Navbar isValid="true" />
      <div className="container py-4">
        <h1 className="display-3">Notice:{notice.notice}</h1>
        <hr />
        <ul className="list-group w-50">
          <li className="list-group-item">
            <b>Notice : </b>
            {notice.notice}
          </li>
          <li className="list-group-item">
            <b>Charges : </b>
            {notice.charges}
          </li>
          <li className="list-group-item">
            <b>Sort Order : </b>
            {notice.sortOrder}
          </li>
        </ul>
        <Link className="btn btn-warning mt-3" to="/notice">
          Back
        </Link>
      </div>
    </>
  );
};
