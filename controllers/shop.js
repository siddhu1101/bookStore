const Product = require("../models/product");
const {
  post
} = require("../routes/shop");

exports.getIndex = (req, res, next) => {
  Product.fetchALl()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchALl()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        path: "/products",
        product: product,
        pageTitle: product.title,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,

      })
    })
    .catch((err) => {
      console.log(err);
    });

};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId).then(product => {
    return req.user.addToCart(product);
  }).then(result => {
    console.log(result);
    res.redirect("/cart");
  }).catch(err => {
    console.log(err);
  });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId).then(result => {
    res.redirect("/cart");
  }).catch(err => {
    console.log(err);
  });
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(result => {
    res.redirect("/orders");
  }).catch(err => {
    console.log(err);
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(orders => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  }).catch(err => {
    console.log(err);
  })

};