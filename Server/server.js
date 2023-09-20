const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');
const slipRouter = require('./routes/slipRouter');
const authRouter = require('./routes/authRouter');


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB ' + error);
  });

//ROUTES
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/slip', slipRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});