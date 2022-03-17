const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/user_routes");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
