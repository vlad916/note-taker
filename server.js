// dependencies
const express = require ('express');
// tells node that we are creating an express server
const app = express();

// sets an initial port. 
const PORT = process.env.PORT || 5000;

// handles data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set static folder
app.use(express.static("public"));
app.use(express.static("db"));

// routers
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));