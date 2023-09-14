const express = require('express');
const mongoose = require('mongoose');
const morgran = require('morgan');
const bodyParser = require('body-parser');

const readerRoutes = require('./server/routes/readerRoute');
mongoose.connect('mongodb+srv://taingo1773:bY8r1Q7m6QsdZSlJ@cluster0.d6eqm8f.mongodb.net/LiBoo?retryWrites=true&w=majority',
{
    useNewUrlParser:true, 
    useUnifiedTopology:true
})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})

const app = express();

app.use(morgran('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.use('/api/Reader', readerRoutes);