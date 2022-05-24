const express = require('express');
const cors = require('cors');

// Controllers

const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');
const { default: helmet } = require('helmet');
const compression = require('compression');

//Init express app
const app = express();

//Enable CORS

app.use(cors());

//Enable incoming JSON data
app.use(express.json());

// Heroku

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

//Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

//Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
