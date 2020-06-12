var uuid = require('uuid');
var _ = require('underscore');
var Customer = require('../model/customer.model');

var JOINING_FEES = 100;

function updateCustomerFn(id, body, cb) {
    let customerBody = body;
    customerBody.lastUpdated = new Date();
    Customer.findOneAndUpdate({customer_id: id}, customerBody, function (err, resp) {
        cb(err, resp);
    })
}

function updateParentPayback(parentId) {
    let updateQuery = { $inc: { payload: 30 }};
    Customer.findOne({customer_id: id}, function (err1, resp1) {
        if(err1) {
            console.log('Error : Failed to update parent payback : ', err1);
        }
        if(resp1.isAmbassador) {
            updateQuery = { $inc: { payload: 40 }};
        }
        updateCustomerFn(parentId, updateQuery, ()=>{});
    });
}

exports.all = function(req, res) {
    return res.send({msg: 'success'});
};

// Get a customer using customer_id
exports.getCustomer = function(req, res) {
    Customer.find({customer_id: req.params.id}, function (custErr, custRes) {
        if(custErr) {
            return res.status(404).send({msg: 'Err'})
        }
        return res.send(custRes);
    });
};

// Get all customers
exports.getCustomers = function(req, res) {
    Customer.find({}, function (custErr, custRes) {
        if(custErr) {
            return res.status(404).send({msg: 'Err'})
        }
        return res.send(custRes);
    });
};

// Add a new customer
exports.addCustomers = function (req, res) {
  let customer = new Customer(req.body);
  customer.customer_id = uuid();
  customer.joiningDate = new Date();
  customer.lastUpdated = new Date();
  customer.payload = 0;
  customer.isAmbassador = customer.isAmbassador || false;
  if(customer.referral_id) {
      updateParentPayback()
  } else {
      customer.referral_id = null;
  }
    customer.save(function (custErr, custResp) {
      if(custErr) {
          return res.status(404).send({custErr})
      }
      return res.send(custResp);
  });
};

// Update a customer using customer_id
exports.updateCustomers = function (req, res) {
    updateCustomerFn(req.params.id, req.body, function (custErr, custResp) {
        if(custErr) {
            return res.status(404).send({custErr})
        }
        return res.send(custResp);
    });
};

// Delete a customer using customer_id
exports.deleteCustomers = function (req, res) {
    Customer.remove({
        customer_id: req.params.id
    }, function(custErr, custResp) {
        if (custErr) {
            return res.send(custErr);
        }
        return res.json({ message: 'Successfully deleted' });
    });
};


exports.getAllChilds = function (req, res) {
    Customer.find({referral_id: req.params.id}, function (custErr, custResp) {
        if (custErr) {
            return res.status(404).send(custErr);
        }
        return res.json(custResp);
    })
};

exports.getReferralCount = function (req, res) {
    Customer.aggregate([{ $group : { _id : "$referral_id", childs: { $push: "$customer_id"}}}], function (custErr, custResp) {
        if (custErr) {
            return res.status(404).send(custErr);
        }
        custResp =  custResp.filter((item) => item._id);
        let ids = _.pluck(custResp, '_id');
        Customer.find({customer_id: {$in : ids}}, function (err2, cust) {
            if(err2) {
                return res.status(404).send(err2);
            }
            let custWithRefCount = [];
            cust.forEach((item)=> {
                let obj = Object.assign({}, item.toObject());
                let itemObj = _.findWhere(custResp, {_id: item.customer_id});
                obj.childs = itemObj.childs;
                obj.referral_count = obj.childs.length;
                custWithRefCount.push(obj);
            })
            return res.json(custWithRefCount);
        });
    })
};

exports.getAmbassadorChilds = function (req, res) {
    Customer.find({isAmbassador: true}, function (err1, resp1) {
        if (err1) {
            return res.status(404).send(err1);
        }
        var ambassadorData = [];
        var ids = _.pluck(resp1, 'customer_id');
        Customer.find({referral_id: {$in: ids}}, function (err2, resp2) {
            if (err2) {
                return res.status(404).send(err2);
            }
            resp1.forEach((item) => {
                let obj = Object.assign({}, item.toObject());
                let childs = _.where(resp2, {referral_id: item.customer_id});
                obj.childs = childs;
                ambassadorData.push(obj);
            });
            res.send(ambassadorData);
        })
    })
};

exports.getNthChilds = function (req, res) {
    var NthLevel = req.params.n;
    Customer.find({}, function (err1, resp) {
        if (err1) {
            return res.status(404).send(err1);
        }
        var resp = JSON.parse(JSON.stringify(resp));
        var heirarchy = _.where(resp, {referral_id:  null});

        function getChilds(parent, currLevel, uptoLevel) {
            if(currLevel == uptoLevel) {
                return ;
            }
            let childs = _.where(resp, {referral_id:  parent.customer_id});
            parent.childs = childs;
            if(childs.length > 0) {
                for(var k = 0; k < childs.length; childs++) {
                    currLevel++;
                    getChilds(parent.childs[k], currLevel, uptoLevel);
                }
            }
        }
        for(let j = 0; j < heirarchy.length; j++) {
            getChilds(heirarchy[j], 1, NthLevel);
        }
        res.send({heirarchy})
    })
};