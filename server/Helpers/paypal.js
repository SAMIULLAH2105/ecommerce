const paypal = require("@paypal/paypal-js");

paypal.configure({
  mode: "",
  client_id: "",
  client_secret: "",
});

module.exports = paypal;
