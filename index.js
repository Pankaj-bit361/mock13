const express = require("express");
const { connection } = require("./db");
const app = express();
const cors = require("cors");
const { UserRouter } = require("./routes/user.routes");
const { auth } = require("./middleware/auth.middleware");
const { BlogRouter } = require("./routes/blog.routes");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send(`<h1>Welcone to the Blog App</h1>`);
});

app.use("/users", UserRouter);

app.use("/blogs", BlogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }

  console.log(`connect to the port ${process.env.port}`);
});
