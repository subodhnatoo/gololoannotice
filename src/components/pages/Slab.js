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

export const Slab = () => {
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

  const [slab, setSlab] = useState([]);

  useEffect(() => {
    getSlabList();
  }, []);

  const getSlabList = async () => {
    const result = await axios.get(WebAPIURL + "/api/Slab/GetAll", {
      headers: headers,
    });
    setSlab(result.data);
  };

  const [slabID, setSlabID] = useState(0);
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ShowModal = (ID, Active, e) => {
    e.preventDefault();
    setSlabID(ID);
    setActive(Active);
    handleShow();
  };

  const ActivateDeActivate = async (slabID, active, e) => {
    let deleteSlab = {
      slabID: slabID.toString(),
      action: (active =
        active == "False" ? true : active == "True" ? false : false),
      userID: "1",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const result = await axios.get(
      WebAPIURL +
        `/api/Slab/ActiveDeactivate?SlabID=${deleteSlab.slabID}&Action=${deleteSlab.action}&UserID=${deleteSlab.userID}`,
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
      getSlabList();
    }
  };

  return (
    <>
      <Navbar isValid="true" />
      <div className="container">
        <div className="py-4">
          <div className="container" style={{ width: "70%" }}>
            <Link to="/slab/slabadd">
              <AddBoxIcon style={{ fontSize: "40px" }} />
            </Link>
            <table className="table border shadow">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Slab From</th>
                  <th scope="col">Slab To</th>
                  <th scope="col">Slab</th>
                  <th scope="col">Slab For</th>
                  <th style={{ paddingLeft: "40px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {slab.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.slabFrom}</td>
                    <td>{item.slabTo}</td>
                    <td>{item.slabs}</td>
                    <td>{item.slabFor}</td>
                    <td>
                      <Link
                        style={{ marginRight: "5px" }}
                        to={`/slab/slabview/${item.slabID}`}
                        className="actions"
                      >
                        <PageviewIcon style={{ fontSize: 40 }} />
                      </Link>
                      <Link
                        style={{ marginRight: "5px" }}
                        to={`/slab/slabedit/${item.slabID}`}
                        className="actions"
                      >
                        <EditIcon
                          className="EditIcon"
                          style={{ fontSize: 30 }}
                        />
                      </Link>
                      <Link
                        style={{ marginRight: "5px" }}
                        ID={item.slabID}
                        className="actions"
                        onClick={(e) => ShowModal(item.slabID, item.active, e)}
                      >
                        {item.active == "True" ? (
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
                        {active == "True" ? (
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
                              ActivateDeActivate(slabID, active, e)
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

//TODO - Do code for edit,view and delete
