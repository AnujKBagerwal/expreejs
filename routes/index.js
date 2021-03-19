const router = require('express').Router();
const apiKeyMiddleware = require('../middlewares/apiKey');

// Router Level Middleware
// router.use(apiKeyMiddleware);

//change app.get to router.get
router.get('/', (req, res) => {
  //   res.sendFile(path.resolve(__dirname) + '/index.html');
  res.render('index', {
    title: 'My Home Page',
  });
});

router.get('/about', (req, res) => {
  //   res.sendFile(path.resolve(__dirname) + '/about.html');
  res.render('about', {
    title: 'My About Page',
  });
});

// download file
// dynamic data download use Template engine Like pug,ejs,handlebar
router.get('/download', (req, res) => {
  res.download(path.resolve(__dirname) + '/about.html');
});

// single Route Level Middleware
// to use multiple middleware in sigle route you can pass it in array like
// [apiKeyMiddleware1,apiKeyMiddleware2,apiKeyMiddleware3]
// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//   res.json([
//     {
//       id: '1',
//       name: 'Chrome',
//     },
//     {
//       id: 2,
//       name: 'FireFox',
//     },
//   ]);
// });

module.exports = router;
