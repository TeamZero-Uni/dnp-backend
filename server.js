const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
