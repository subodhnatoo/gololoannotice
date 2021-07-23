import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

export const Navbar = (props) => {
  let history = useHistory();

  const LogOut = () => {
    localStorage.clear();
    history.push("/");
  };

  if (props.isValid == "false") {
    return null;
  } else {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/homepage">
              <HomeRoundedIcon style={{ fontSize: "40px" }} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Masters
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        style={{ color: "black" }}
                        exact
                        to="/notice"
                      >
                        Notice
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        style={{ color: "black" }}
                        exact
                        to="/slab"
                      >
                        Slab
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        style={{ color: "black" }}
                        exact
                        to="/noticeslab"
                      >
                        Notice-Slab
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        style={{ color: "black" }}
                        exact
                        to="/freezedays"
                      >
                        Freeze Days
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={LogOut}
                >
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};
