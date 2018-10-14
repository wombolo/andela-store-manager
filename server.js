const express = require('express');
const body_parser = require('body-parser');
const routes = require('./routes/index');

const app = express();

//Set port
const PORT = process.env.PORT || 5000;

//Configure ap to use bodyparser
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//Register routes in app
app.use('/', routes);

//Start Server
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`);
});

//Export for Mocha testing
module.exports = app;