import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './server/routes/v1/index';
import authRoute from './server/middleware/auth_route';
import loginRoute from './server/routes/v1/login_route';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Configure app to use bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());

app.use(cors());

app.use('/api/v1/auth/', loginRoute);

// Authenticate routes first. i.e only logged in user can proceed
app.use('/api/v1/', authRoute.verifyToken, routes);

// index route
app.all('/', (req, res) => { // Manage index route
  res.status(200).json({ message: 'Welcome to store manager API' });
});

app.all('/*', (req, res) => { // Manage all sub-routes and 404 (Not found links)
  res.status(404).json({ message: 'Requested URL not found. Try again' });
});

// Start Server & Export for Mocha testing
export default app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
