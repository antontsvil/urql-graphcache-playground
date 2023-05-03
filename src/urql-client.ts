import { devtoolsExchange } from "@urql/devtools";
import { Client, fetchExchange } from "@urql/core";
import { cacheExchange as cacheExchange2 } from "@urql/exchange-graphcache";
import { retryExchange } from "@urql/exchange-retry";
import schema from "./schema.json";
import { LiftQuery } from "./queries";

const url = "https://snowtooth.moonhighway.com/";

const exchanges: any[] = [
  cacheExchange2({
    schema,
    keys: {},
    updates: {
      Query: {
        allLifts(result, args, cache, info) {
          for (const lift of (result?.allLifts as any[]) ?? []) {
            cache.updateQuery(
              { query: LiftQuery, variables: { id: lift.id } },
              (data) => {
                if (!data) return null;
                return { ...lift, status: "MY_CUSTOM_STATUS" };
              }
            );
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
