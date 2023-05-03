export const LiftQuery = `
query($id: ID!) {
   Lift(id:$id)  {
    id
    name
    status
    capacity
  }
}`;
