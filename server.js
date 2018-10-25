import express from 'express';
import body_parser from 'body-parser';
import routes from './server/routes/v1/index.js';

const app = express();

//Set port
const PORT = process.env.PORT || 7401;

//Configure app to use bodyparser
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());



//Register routes in app
// app.use(routes);
app.use('/api/v1/',routes);

//index route
app.get('/', function (req, res) {
    res.status(200).json({message: "Welcome to store manager API",});
});

app.use('/*', function (req, res) {
    res.status(404).json({message: "Requested URL not found. Try again",});
});


//Start Server & Export for Mocha testing
export default app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});