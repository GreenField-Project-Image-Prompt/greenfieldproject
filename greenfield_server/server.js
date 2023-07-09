const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json({limit: '50mb'}));


const imgRouter = require("./router/imgRouter.js");
const userRouter = require("./router/userRouter.js");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/img", imgRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
