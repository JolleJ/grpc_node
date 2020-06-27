// requirements
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const tagsRoutes = require('./routes/tagsRoutes');

// express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', productRoutes);

// routes
app.use('/api', tagsRoutes);

// run server
app.listen(3000, () => {
  console.log('Server listing on port 3000');
});