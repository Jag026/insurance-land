const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = rquire('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
