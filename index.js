import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import path from "node:path";

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

import apiRouter from "./routes/apiRouter.js";
import authRouter from "./routes/authRouter.js";

app.use("/api", apiRouter);

app.use("/", authRouter);

app.use((req, res) => {
  res.status(404).json("No resource found");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json(err.message || "Error 500: Internal Server Error");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log(`App started at port: ${PORT}`);
});
