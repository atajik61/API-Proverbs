import express from "express";

import fs from "fs";
import routes from "./routs/routes.js";
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //
//routes
app.use("/", routes());

app.listen(PORT, () => {
  console.log("server is runing");
});
