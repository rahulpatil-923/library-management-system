
let app = require("./src/app.js");

let port = 4000;

app.listen(port, (req, res) => {
  console.log("server started at port:" + port);
});
