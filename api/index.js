const express = require("express");
const ExpressError = require("./ExpressError");

const app = express();
// parse the body as json if is pass as json
app.use(express.json());
// parse the body as form data is send that way
app.use(express.urlencoded({ extended: true }));

// manages request to routes that dont exist
app.use(function (req, res, next) {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

app.use((error, req, res, next) => {
  // the default status is a 500 Internal Server Error
  let status = error.status || 500;
  let message = error.message;

  // set the status and aler the user
  res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
