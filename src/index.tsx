import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LiftsTable from "./LiftsTable";
import Lift from "./Lift";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </React.StrictMode>
);
