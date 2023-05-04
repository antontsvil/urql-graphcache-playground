import React from "react";
import "./LiftsTable.css";

import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query {
    allLifts {
      id
      name
      status
      capacity
    }
  }
`;

function LiftsTable() {
  const result = useQuery(query);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.allLifts?.map((u: any) => (
            <tr key={u.id}>
              <td>
                <Link to={`/lift/${u.id}`}>{u.id}</Link>
              </td>
              <td>{u.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiftsTable;
