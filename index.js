const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const API_ROUTE = '/api/';

const app = express();

const corsOptions = require('./config/cors.config.js');
const connectMongo = require('./config/mongo.config');

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(bodyParser());

require('dotenv').config();


connectMongo();

app.get('/', (req, res) => {
    res.sendStatus(200);
})

const apiRouter = require('./api/api');

app.use(`${API_ROUTE}`, apiRouter);

const handleErrors = require('./middleware/errorHandler');

app.use(handleErrors);

const PORT = 8000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));