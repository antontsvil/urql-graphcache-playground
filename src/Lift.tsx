import React from "react";
import "./LiftsTable.css";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query ($id: ID!) {
    Lift(id: $id) {
      id
      name
      status
      capacity
      elevationGain
    }
  }
`;

function Lift() {
  const { id } = useParams();
  const { loading, data, error, previousData } = useQuery(query, {
    variables: { id },
    returnPartialData: true,
  });

  if (!data?.Lift?.elevationGain && data?.Lift?.name) {
    console.log("We did it! 🥂");
  }

  return (
    <div>
      <pre>{JSON.stringify(previousData, null, 2)}</pre>
      <pre>{JSON.stringify({ loading, data, error }, null, 2)}</pre>
    </div>
  );
}

export default Lift;
