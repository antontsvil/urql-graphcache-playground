# The Goal

Configure a graphql client that will:

* Query for a list of items (`Lift`s in this case)
* Have a detail page where we query for a singular `Lift`
* Display the single item's cached data from the list **before** the graphql call request completes.

# Success with Apollo

Couldn't figure this out in URQL, but Apollo will allow you if you:

* ensure there is a `typePolicies` entry for the singular query to link it to its respective cache entry via `__typedname` and `args.id`
* When using hooks, set the `returnPartialData` option to true.