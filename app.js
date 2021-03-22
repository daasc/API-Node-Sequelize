const setApp = require("./src");

setApp
  .then((app) =>
    app.listen(3000, () => console.info("app running on port 3000"))
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
