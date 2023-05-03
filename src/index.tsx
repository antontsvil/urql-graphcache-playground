import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "urql";
import UrqlClient from "./urql-client";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LiftsTable from "./LiftsTable";
import Lift from "./Lift";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider value={UrqlClient}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lifts">Lifts</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LiftsTable />} />
          <Route path="/lifts" element={<LiftsTable />} />
          <Route path="/lift/:id" element={<Lift />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
