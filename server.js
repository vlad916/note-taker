// dependencies
const express = require ('express');
// tells node that we are creating an express server
const app = express();

// handles data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set static folder
app.use (express.static(path.join(__dirname, 'public')));

// routers
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// sets an initial port. 
const PORT = process.env.PORT || 5000;

// listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));