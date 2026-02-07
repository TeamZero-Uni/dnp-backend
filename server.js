const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes/routes');
const corsOption = require('./config/allowedOrigin');
const credential = require('./middleware/credentials');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));

app.use(credential);
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
