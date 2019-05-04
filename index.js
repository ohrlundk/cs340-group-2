var express = require('express');
// var mysql = require('./dbcon.js');

var sampleData = {
  products: [
    {
      id: 0,
      sku: 'sku number',
      price: '000.00',
      name: 'Product One',
      description: 'description text goes here.',
      brand: 'brand',
      model: 'model',
      stock: 30,
    },
    {
      id: 1,
      sku: 'sku number',
      price: '000.00',
      name: 'Product Two',
      description: 'description text goes here.',
      brand: 'brand',
      model: 'model',
      stock: 20,
    },
    {
      id: 2,
      sku: 'sku number',
      price: '000.00',
      name: 'Product Three',
      description: 'description text goes here.',
      brand: 'brand',
      model: 'model',
      stock: 10,
    }
  ]
}

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(express.static('public'));

app.get('/', (req,res,next) => {
  let context = {};
  res.render('home', context);
});

// products
app.get('/products', (req,res,next) => {
  // todo: get products from db
  let context = {
    products: sampleData.products,
  }

  res.render('pages/products', context);
});

app.get('/products/add', (req,res,next) => {
  res.render('pages/product-add');
});

app.get('/products/:productId', (req,res,next) => {
  let params = req.params;
  let context = {};
  // todo: get product info from id param

  context.product = sampleData.products[params.productId];
  
  res.render('pages/product', context);
});

app.get('/cart', (req,res,next) => {
  let context = {};
  // todo: make db call to get cart line items
  let lineitems = []
  context.lineitems = lineitems;

  res.render('pages/cart', context);
});

app.get('/cart/:productId', (req,res,next) => {
  // todo: create lineitem in db with product id and account id
  res.redirect('/cart');
});

app.get('/checkout', (req,res,next) => {
  // todo: create order & orderId
  // todo: get account id from storage
  // todo: update cart items with orderId
  // todo: select all order line items
  let lineitems = [];
  let context = {
    lineitems: lineitems,
    orderId: '123',
  }

  res.render('pages/order', context);
})


app.get('/signin', (req,res,next) => {
  let context = {};
  let accountId = req.query && req.query.account_id;

  if (accountId) {
    let account = {
      id: accountId,
      fname: 'John',
      lname: 'Doe',
    }
    context.account = account;
    res.render('pages/account', context);
  } else {
    res.render('pages/signin');
  }  
});


// account
app.get('/account/new', (req,res,next) => {
  res.render('pages/account-new');
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});