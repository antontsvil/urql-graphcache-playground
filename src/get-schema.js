const { getIntrospectionQuery } = require("graphql");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "schema.json");
if (fs.existsSync(filePath)) {
  console.info("Schema exists, bailing");
} else {
  const url = "https://snowtooth.moonhighway.com/";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      variables: {},
      query: getIntrospectionQuery({ descriptions: false }),
    }),
  })
    .then((result) => result.json())
    .then((response) => {
      if (!response) {
        throw new Error("fuc");
      }
      fs.writeFile(filePath, JSON.stringify(response?.data), (err) => {
        if (err) {
          console.error("Writing failed:", err);
          return;
        }
        console.log("Schema written!");
      });
    });
}
