import express from "express";
import cors from "cors";
import getUserFromToken from "./middleware/getUserFromToken.js";

import usersRouter from "./routes/users.js";
import departmentsRouter from "./routes/departments.js";
import professorsRouter from "./routes/professors.js";

const app = express();

app.use(cors({ origin: /localhost:\d+$/ }));

app.use(express.json());

app.use(getUserFromToken);

app.use("/api/users", usersRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/professors", professorsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send({ error: err.message });
});

export default app;
