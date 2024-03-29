const path = require('path');
require('dotenv').config({
	path: path.join(__dirname, '.env')
});
const mongoose=require('mongoose')
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const bodyParser = require('body-parser');
const routes= require('./routes/api.route')
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(cors());

/* Connecting to the database. */
mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use('/api',routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
module.exports=app

