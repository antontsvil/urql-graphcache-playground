import React from "react";
import "./LiftsTable.css";
import { useQuery } from "urql";
import { Link } from "react-router-dom";

function LiftsTable() {
  const [lifts, execLifts] = useQuery({
    query: `
query  {
  allLifts {
    id
    name
    status
    capacity
  }
}`,
    // requestPolicy: "network-only",
  });
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
          {lifts?.data?.allLifts?.map((u: any) => (
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
