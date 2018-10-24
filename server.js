import express from 'express';
import body_parser from 'body-parser';
import routes from './server/routes/v1.js';

const app = express();

//Set port
const PORT = process.env.PORT || 7401;

//Configure app to use bodyparser
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//index route
app.get('/', function (req, res) {
    res.status(200).json({message: "Welcome to store manager API",});
});


//Register routes in app
// app.use(routes);
app.use('/api/v1/',routes);

app.use('/*', function (req, res) {
    res.status(404).json({message: "Requested URL not found. Try again",});
});

// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });


//Start Server & Export for Mocha testing
export default app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});