const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

const mountRoutes = require('./routes');

app.use(cors());
app.use(logger('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mountRoutes(app);

app.listen(PORT);