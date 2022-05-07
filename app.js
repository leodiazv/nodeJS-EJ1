const express = require('express');
const cors = require('cors');

// Controllers

const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

//Init express app
const app = express();

//Enable CORS

app.use(cors());

//Enable incoming JSON data
app.use(express.json());

//Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

//Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
