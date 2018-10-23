const express = require('express'),
    body_parser = require('body-parser'),
    routes = require('./routes/index');

const app = express();

//Set port
const PORT = process.env.PORT || 8919;

//Configure ap to use bodyparser
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//Register routes in app
app.use(routes);
// app.use('/api/v1/',routes);
// app.use('*', (req,res) =>{
    // return
// });


//Start Server
//Export for Mocha testing

module.exports = app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`);
});

// module.exports = app;