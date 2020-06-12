# Technologies used
# NodeJS, ExpressJS, MongoDB

# External libraries used
# Underscore, uuid

# To add all dependencies using command run npm install
# To Start server we need to run command npm start

# API Endpoints
# 1) CRUD operation for Customer
#   1.1) To create new Customer use post call to /customers/ with customer json
#   1.2) To get a Customer use get call to /customers/customer_id
#   1.3) To delete a Customer use delete call to /customers/customer_id
#   1.4) To update a Customer use put call to /customers/customer_id with data needs to update as customer json
#   1.5) To get all Customer use get call to /customers/customer_id

# 2) Add a refferral
# Use a post call for /customers/ with customer json and also add referral_id as other customer_id
# this will create a new customer and add referral payback to other customer

# 3) Fetch all child
# Use a get call to /customers/customer_id/childs/

# 4) Fetch all customer with referral count
# Use a get call to /customers/referral/count

# 5) Add a ambassador
# Use a post call for /customers/ with customer json and also add is_ambassador as true

# 6) Convert a customer to ambassador
# Use a get call to /customers/:customer_id with customer is_ambassador attribute true
# Once you convert customer to ambassador its payback policy get reflected on referral

# 7) Fetch all ambassador with children
# Use a get call to /ambassador/childs/

# 8) Fetch customer's child upto nth level
# Use a get call to /customer/childs/:n/ where :n is should be replaced with nth level

# Json Structure
# 1) Customer CRUD
#   Request body
#   {
#        "customer_id":"38c33968-fc2b-4746-8945-08cf2b942b5a",
#        "isAmbassador":false, #(optional)
#        "referral_id":"02432ae1-ec46-4e2c-944f-eb725a05623e" #(optional)
#    }
#
#   Response body
#  [{
#        "_id":"5a88150087d33e5a5658bc66",
#        "customer_id":"38c33968-fc2b-4746-8945-08cf2b942b5a",
#        "joiningDate":"2018-02-17T11:41:52.549Z",
#        "lastUpdated":"2018-02-17T11:41:52.549Z",
#        "__v":0,"email":"abc1@abc1.in",
#        "isAmbassador":false,
#        "referral_id":"02432ae1-ec46-4e2c-944f-eb725a05623e",
#       "payload":30
#  }]
#
# 1.1) For PUT request just add property that needs to get update
#
# 2) Customer with referral count
# Response body
# [
#      {
#          "_id": ...,
#          "customer_id": ...,
#          "joiningDate": ...,
#          "lastUpdated": ...,
#          "email": ...,
#          "childs": [
#          ],
#          "referral_count": 4
#      }
#  ]
#
#
#
# 3) Fetch childs upto Nth level
#   Response body
# {
#    "heirarchy": [
#        {
#            "_id": ...,
#            "email": ...,
#           "customer_id": ...,
#            "childs": [
#                {
#                    "_id": ...,
#                    "email": ...,
#                    "customer_id": ...,
#                    "childs": [
#                    ]
#                }
#            ]
#        }
#    ]
# }
#
#