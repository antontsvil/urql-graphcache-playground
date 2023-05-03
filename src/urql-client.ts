import { devtoolsExchange } from "@urql/devtools";
import { Client, fetchExchange, gql } from "@urql/core";
import { cacheExchange as cacheExchange2 } from "@urql/exchange-graphcache";
import { retryExchange } from "@urql/exchange-retry";
import schema from "./schema.json";
import { LiftQueryFields } from "./queries";

const url = "https://snowtooth.moonhighway.com/";

const exchanges: any[] = [
  cacheExchange2({
    schema,
    keys: {},
    updates: {
      Query: {
        allLifts(result, args, cache, info) {
          for (const lift of (result?.allLifts as any[]) ?? []) {
            const query = gql`fragment _ on Lift { ${LiftQueryFields} }`;
            const variables = { id: lift.id };
            cache.writeFragment(query, lift, variables);
          }
        },
      },
    },
    resolvers: {},
    optimistic: {},
  }),
  devtoolsExchange,
  fetchExchange,
  retryExchange({
    initialDelayMs: 1000,
    maxDelayMs: 2000,
    randomDelay: true,
    maxNumberAttempts: 3,
    retryIf: (err: any) => err && err.networkError,
  }),
];

const UrqlClient = new Client({
  url,
  exchanges,
});

export default UrqlClient;
