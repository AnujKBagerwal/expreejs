const router = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
const User = require('./user');
const mongo = require('mongodb');
// let products = require('../products');
// let products = [];

router.get('/products', (req, res) => {
  res.render('products', {
    title: 'My Product Page',
  });
});

router.get('/api/products', async (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
  // res.json(products);
});

router.post('/api/products', async (req, res, next) => {
  // try {
  //   console.log(city);
  // } catch (err) {
  //   next(ErrorHandler.serverError(err.message));
  // }
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      next(ErrorHandler.validationError('Name and Price Fields are Required!'));
      // throw new Error('All Fields are required.');
      // return res.status(422).json({ error: 'All Fields are required.' });
    }

    // const newProduct = {
    //   id: new Date().getTime().toString(),
    //   name,
    //   price,
    // };

    // products.push(newProduct);
    const myuser = new User(req.body);
    await myuser.save();
    res.send(myuser);
  } catch (error) {
    res.send({ message: error });
  }
});

router.put('/api/products', async (req, res, next) => {
  try {
    const { name, price, _id } = req.body;
    console.log('req.body', req.body);
    const data = await User.findById(_id);
    Object.assign(data, req.body);
    data.save();
    res.send(data);
    // if (!name || !price) {
    //   next(ErrorHandler.validationError('Name and Price Fields are Required!'));
    // }

    // const result = await User.findByIdAndUpdate(_id, req.body, {
    //   useFindAndModify: false,
    // });
    // res.status(200).send(result);
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete('/api/products/:productId', async (req, res) => {
  // products = products.filter((product) => req.params.productId !== product.id);
  // res.json({ status: 'OK' });
  try {
    const result = await User.findByIdAndDelete(req.params.productId);
    res.status(200).send(result);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
