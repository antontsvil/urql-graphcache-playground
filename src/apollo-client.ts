import { ApolloClient, InMemoryCache } from "@apollo/client";
import { FieldReadFunction } from "@apollo/client/cache/inmemory/policies";

const uri = "https://snowtooth.moonhighway.com/";

const readSingleType =
  (__typename: string): FieldReadFunction =>
  (_: any, { args, toReference }) => {
    return toReference({ __typename, id: args?.id });
  };

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Lift: {
            read: readSingleType("Lift"),
          },
        },
      },
    },
  }),
});

export default client;
