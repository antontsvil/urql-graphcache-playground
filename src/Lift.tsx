import React from "react";
import "./LiftsTable.css";
import { useQuery } from "urql";
import { useParams } from "react-router";
import { LiftQuery } from "./queries";

function Lift() {
  const { id } = useParams();
  const [lift, execLift] = useQuery({
    query: LiftQuery,
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
