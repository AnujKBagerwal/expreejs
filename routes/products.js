const router = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
let products = require('../products');

router.get('/products', (req, res) => {
  res.render('products', {
    title: 'My Product Page',
  });
});

router.get('/api/products', (req, res) => {
  res.json(products);
});

router.post('/api/products', (req, res, next) => {
  // try {
  //   console.log(city);
  // } catch (err) {
  //   next(ErrorHandler.serverError(err.message));
  // }

  const { name, price } = req.body;
  if (!name || !price) {
    next(ErrorHandler.validationError('Name and Price Fields are Required!'));
    // throw new Error('All Fields are required.');
    // return res.status(422).json({ error: 'All Fields are required.' });
  }

  const newProduct = {
    id: new Date().getTime().toString(),
    name,
    price,
  };

  products.push(newProduct);
  res.json(newProduct);
});

router.delete('/api/products/:productId', (req, res) => {
  products = products.filter((product) => req.params.productId !== product.id);
  res.json({ status: 'OK' });
});

module.exports = router;
