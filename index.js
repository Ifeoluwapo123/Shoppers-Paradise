const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;
const handleResponse = require("./utils/response.js");
const passport = require("passport");
const passportConfig = require("./config/passport");
const cookieSession = require("cookie-session");
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());
//middlewares
app.use(bodyparser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
//app.use(bodyparser.json());
app.use(cors());

//end

//COOKIE CONFIG
app.use(
  cookieSession({
    name: "shopingsession",
    keys: ["ensure this is protected", "ensure! this is !protected"],
  })
);

app.use("/api/products", require("./routes/products.route"));
app.use("/api/orders", require("./routes/orders.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/auth", require("./routes/auth.route"));

app.get("/", (req, res) => {
  const data = ["dami", "ade"].map((_, key) => {
    return `${_} hello ${key}`;
  });
  console.log(data);
  handleResponse(req, res, 404, { data: data }, "testing api");
});

app.listen(port, (err) => {
  if (err) console.log("error connection");
  else console.log(`subscriber connected to ${port}`);
});
