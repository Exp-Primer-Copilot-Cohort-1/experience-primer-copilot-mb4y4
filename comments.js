// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express application
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());

// Add route
app.get('/', (req, res) => {
  res.send('Hello from comments service');
});

// Start application
app.listen(4001, () => {
  console.log('Listening on 4001');
});