const mongoose = require("mongoose");
const app = require("./app");

const { DB_PATH, PORT = 3000 } = process.env;

mongoose
  .connect(DB_PATH)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
