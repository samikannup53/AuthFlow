// Importing Necessary FIles and Modules
require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/dbConfig.js");
const port = process.env.PORT;

// Connecting Application with MongoDB DataBase
connectDB();

// App Server
app.listen(port, () => {
  console.log(`App Started at Port:${port}, URL : http://localhost:${port}`);
});
