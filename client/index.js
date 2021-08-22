const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const client = require('./client');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Get All Products
app.get('/', (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.render('products', { results: data.products });
    }
  });
});

// Get specific Product
app.post('/', (req, res) => {
  const getProduct = {
    id: req.body.product_id,
  };
  client.get(getProduct, (err, data) => {
    if (err) throw err;
    console.log('Product is found', data);
    res.redirect('/');
  });
});

// Update Product
app.post('/update', (req, res) => {
  const updateProduct = {
    id: req.body.product_id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  client.update(updateProduct, (err, data) => {
    if (err) throw err;
    console.log('Product updated', data);
    res.redirect('/');
  });
});

// Delete Product
app.post('/', (req, res) => {
  const deleteProduct = {
    id: req.body.product_id,
  };
  client.remove(deleteProduct, (err, data) => {
    if (err) throw err;
    console.log('Product removed');
    res.redirect('/');
  });
});
