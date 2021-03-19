const express = require('express');
const path = require('path');
const app = express();
const productRouter = require('./routes/products');
const mainRouter = require('./routes/index');
const port = process.env.PORT || 8080;

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

app.listen(port, () => console.log(`Listening on port ${port}`));
