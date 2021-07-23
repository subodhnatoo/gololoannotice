import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Notice } from "./components/pages/Notice";
import { Slab } from "./components/pages/Slab";
import { NoticeSlab } from "./components/pages/NoticeSlab";
import { FreezeDays } from "./components/pages/FreezeDays";
import { PageNotFound } from "./components/pages/PageNotFound";
import { NoticeAdd } from "./Notice/NoticeAdd";
import { NoticeEdit } from "./Notice/NoticeEdit";
import { NoticeView } from "./Notice/NoticeView";
import { SlabAdd } from "./Slab/SlabAdd";
import { SlabEdit } from "./Slab/SlabEdit";
import { Navbar } from "./Layout/Navbar";
import { HomePage } from "./Layout/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../src/components/pages/Login";

function App() {
  const WepApiEndPointURL = "https://localhost:44332";
  // const WepApiEndPointURL="http://kaireegoldloan.hopto.org/GoldLoanWebAPIDemo/";

  return (
    <Router>
      <div className="App">
        <Navbar isValid="false" />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Login WebAPIURL={WepApiEndPointURL} />}
          ></Route>
          <Route exact path="/notice" component={Notice}></Route>
          <Route exact path="/slab" component={Slab}></Route>
          <Route exact path="/noticeslab" component={NoticeSlab}></Route>
          <Route exact path="/freezedays" component={FreezeDays}></Route>
          <Route exact path="/notice/noticeadd" component={NoticeAdd}></Route>
          <Route
            exact
            path="/notice/noticeedit/:id"
            component={NoticeEdit}
          ></Route>
          <Route
            exact
            path="/notice/noticeview/:id"
            component={NoticeView}
          ></Route>

          <Route exact path="/slab/slabadd" component={SlabAdd}></Route>
          <Route exact path="/slab/slabedit/:id" component={SlabEdit}></Route>
          <Route exact path="/homepage" component={HomePage}></Route>
          {/* <Route component={PageNotFound}></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
