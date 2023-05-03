export const LiftQueryFields = `
    id
    name
    status
    capacity
`;
export const LiftQuery = `
query($id: ID!) {
   Lift(id:$id)  {
    ${LiftQueryFields}
  }
}`;
