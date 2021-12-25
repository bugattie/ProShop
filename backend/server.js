import dotenv from "dotenv";
import chalk from "chalk";

import connectDB from "./config/DB.js";
import app from "./app.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening request on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("Unhandled Rejection, Shutting down......");

  server.close(() => {
    process.exit(1);
  });
});
