const express = require('express');
const app = express();
const cors = require('cors'); 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conn = require('../src/services/db');
conn.dbConnection();

const useRoute = require('./routes/expenseRoutes');
app.use('/api/v1/users', useRoute);

app.use('/*', (req, res) => {
  res.send("No Router Match found");
});

app.listen(4000, () => console.log("Connected to port 4000"));
