import React from "react";
import "./LiftsTable.css";
import { useQuery } from "urql";
import { useParams } from "react-router";

function Lift() {
  const { id } = useParams();
  const [lift, execLift] = useQuery({
    query: `query($id: ID!) {
       Lift(id:$id)  {
        id
        name
        status
        capacity
      }
    }`,
    variables: { id },
  });

  const { fetching, stale } = lift ?? {};

  return (
    <div>
      <pre>{JSON.stringify({ fetching, stale })}</pre>
      <pre>{JSON.stringify(lift?.data?.Lift, null, 2)}</pre>
    </div>
  );
}

export default Lift;
