const routes = require('express').Router();
const customerCtrl = require('./controller/customer.controller');

// CRUD API for Customer
routes.get('/', customerCtrl.all);
routes.get('/customers/', customerCtrl.getCustomers);
routes.get('/customers/:id/', customerCtrl.getCustomer);
routes.post('/customers/', customerCtrl.addCustomers);
routes.put('/customers/:id', customerCtrl.updateCustomers);
routes.delete('/customers/:id', customerCtrl.deleteCustomers);


// APT for Customer's child
routes.get('/customers/:id/childs/', customerCtrl.getAllChilds);
routes.get('/customers/referral/count', customerCtrl.getReferralCount);
routes.get('/ambassador/childs/', customerCtrl.getAmbassadorChilds);
routes.get('/customer/childs/:n/', customerCtrl.getNthChilds);

module.exports = routes;