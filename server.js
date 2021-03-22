const express = require('express');
const path = require('path');
const app = express();
const productRouter = require('./routes/products');
const mainRouter = require('./routes/index');
const ErrorHandler = require('./errors/ErrorHandler');
const port = process.env.PORT || 8080;
const User = require('./routes/user');
const mongoose = require('mongoose');
require('dotenv/config');

// store value to reuse and to get
app.set('view engine', 'ejs');

// Global Level Middleware
// app.use(apiKeyMiddleware);

// By default if search or views folder for html
// to change folder name for acknowlage node we have to set value Like
// for html we are using templates named folder apart from views
// app.set('views',path.resolve(__dirname) +'templates')

// use to give static routes and css
// we have to give full name while navigate like about.html
app.use(express.static('public'));

// create middleware to accept json data
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create middleware to submit classic form submit
// when form submit it will reload page
// app.use(express.urlencoded({ extended: false }));

// we can also add prefix
// app.use('/en', mainRouter);
app.use(mainRouter);
app.use(productRouter);

// custom error Handling
app.use((req, res, next) => {
  return res.json({ message: 'Page Not Found !!!' });
});

// Express Error Handling MiddleWare
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }
});

mongoose.connect(
  'mongodb+srv://admin:admin123@cluster0.wmxcd.mongodb.net/test',
  {
    useNewUrlParser: 'true',
    useUnifiedTopology: true,
  }
);
mongoose.connection.on('error', (err) => {
  console.log('err', err);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

// mongoose.connect(
//   'mongodb+srv://admin:admin123@cluster0.wmxcd.mongodb.net/test',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (req, res) => {
//     console.log('connected to database');
//   }
// );

app.listen(port, () => console.log(`Listening on port ${port}`));
