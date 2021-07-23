import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar } from "../../Layout/Navbar";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAlert } from "../../../node_modules/react-alert/dist/cjs/react-alert";

export const Notice = () => {
  const WebAPIURL = localStorage.getItem("webapiurl");
  let history = useHistory();
  const alert = useAlert();
  let token = localStorage.getItem("token");
  if (token == null) {
    history.push("/");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const [notice, setNotice] = useState([]);

  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = async () => {
    const result = await axios.get(WebAPIURL + "/api/Notice/GetAll", {
      headers: headers,
    });
    setNotice(result.data);
  };

  const [noticeID, setNoticeID] = useState(0);
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ShowModal = (ID, Active, e) => {
    e.preventDefault();
    setNoticeID(ID);
    setActive(Active);
    handleShow();
  };

  const ActivateDeActivate = async (noticeID, active, e) => {
    let deleteNotice = {
      noticeID: noticeID.toString(),
      action: (active =
        active == false ? true : active == true ? false : false),
      userID: "1",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const result = await axios.get(
      WebAPIURL +
        `/api/Notice/ActiveDeactivate?NoticeID=${deleteNotice.noticeID}&Action=${deleteNotice.action}&UserID=${deleteNotice.userID}`,
      {
        headers: headers,
      }
    );

    if (result.data) {
      active
        ? alert.show("Record Activated Successfully! ", {
            type: "success",
          })
        : alert.show("Record Deactivated Successfully! ", {
            type: "success",
          });

      handleClose();
      getNoticeList();
    }
  };

  return (
    <>
      <Navbar isValid="true" />
      <div className="container">
        <div className="py-4">
          <div className="container" style={{ width: "50%" }}>
            <Link to="/notice/noticeadd">
              <AddBoxIcon style={{ fontSize: "40px" }} />
            </Link>

            <table className="table border shadow">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Notice</th>
                  <th scope="col">Charges</th>
                  <th scope="col">Sort Order</th>
                  <th style={{ paddingLeft: "40px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {notice.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.notice}</td>
                    <td>{item.charges}</td>
                    <td>{item.sortOrder}</td>
                    <td>
                      <Link
                        style={{ marginRight: "5px" }}
                        to={`/notice/noticeview/${item.noticeID}`}
                        className="actions"
                      >
                        <PageviewIcon style={{ fontSize: 40 }} />
                      </Link>
                      <Link
                        style={{ marginRight: "5px" }}
                        to={`/notice/noticeedit/${item.noticeID}`}
                        className="actions"
                      >
                        <EditIcon
                          className="EditIcon"
                          style={{ fontSize: 30 }}
                        />
                      </Link>
                      <Link
                        style={{ marginRight: "5px" }}
                        ID={item.noticeID}
                        className="actions"
                        onClick={(e) =>
                          ShowModal(item.noticeID, item.active, e)
                        }
                      >
                        {item.active ? (
                          <DeleteIcon
                            className="DeleteIconDeActivate"
                            style={{ fontSize: 30 }}
                          />
                        ) : (
                          <DeleteIcon
                            className="DeleteIconActivate"
                            style={{ fontSize: 30 }}
                          />
                        )}
                      </Link>
                      <Modal show={show} onHide={handleClose}>
                        {active ? (
                          <Modal.Body>
                            Are you sure you want Deactivate this record?
                          </Modal.Body>
                        ) : (
                          <Modal.Body>
                            Are you sure you want Activate this record?
                          </Modal.Body>
                        )}

                        <Modal.Footer>
                          <Button
                            variant="primary"
                            onClick={(e) =>
                              ActivateDeActivate(noticeID, active, e)
                            }
                          >
                            Yes
                          </Button>
                          <Button variant="secondary" onClick={handleClose}>
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
