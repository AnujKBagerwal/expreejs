const router = require('express').Router();
const products = require('../products');

router.get('/products', (req, res) => {
  res.render('products', {
    title: 'My Product Page',
  });
});

router.get('/api/products', (req, res) => {
  res.json(products);
});

router.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(422).json({ error: 'All Fields are required.' });
  }

  const newProduct = {
    id: new Date().getTime().toString(),
    name,
    price,
  };

  products.push(newProduct);
  res.json(newProduct);
});
module.exports = router;
