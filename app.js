const express = require('express');

//Init express app
const app = express();

//Routers

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

//Utils

const { db } = require('./utils/database');

//Enable incoming JSON data

app.use(express.json());

//Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

db.authenticate()
  .then(() => console.log('Database authenticate :)'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Database synced :)'))
  .catch((err) => console.log(err));

//Spin up server

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}! :)`);
});
