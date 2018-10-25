import express from 'express';
import body_parser from 'body-parser';
import routes from './server/routes/v1/index.js';
import jwt from 'jsonwebtoken';
import config from './server/configs/config';           //Config token
import profiles from "./server/database/profiles";      //DB Connection
import { check, validationResult } from 'express-validator/check';  //Validation Lib

const PORT = process.env.PORT || 5000;

const app = express();

app.set('Secret', config.secret);

//Configure app to use bodyparser
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());




//Register routes in app
app.use('/api/v1/',routes);

//index route
app.all("/", function(req, res){      //Manage index route
    res.status(200).json({message: "Welcome to store manager API",});
});

app.all('/*', function (req, res) { //Manage all sub-routes and 404 (Not found links)
    res.status(404).json({message: "Requested URL not found. Try again",});
});

//Start Server & Export for Mocha testing
export default app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});