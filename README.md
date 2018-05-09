# Application

##bamazon

# Description

This is a node application to maintain a product and department information and allow customer to place orders for products

# Installation

1. Install node.js if you do not have it installed already (https://nodejs.org/en/download/)
1. Clone repository bamamzon from https://github.com/remrobem/bamazon
1. run *npm install* to install the dependancies

# Use

There are 3 js files that can be run from a terminal session. Details on executing each of these is found in sections below.

1. **_node bamazonCustomer.js_**
    1. Create an order
1. **_node bamazonManager.js_**
    1. View products
    1. View products with low inventory
    1. Add Inventory to a Product
    1. Add a Product
1. **_node bamazonSupevisor.js_**
    1. View Poduct sales by Department
    1. Add a Department

# General Instructions

1. You must be in a terminal session for the directory that contains the application
1. Use the up/down arrow keys to navigate thru options and lists
1. Select an option or list item by pressing Enter or Return
1. The options and lists generally have an _Exit_ item that can be selected to exit the application

# bamazonCustomer.js

1. run _node bamazonCustomer.js_ from a terminal session in the application directory
1. A list of products is presented
1. Select a product to order
1. Once a product is selected, reply to the prompt with the quantity to order
1. A reply is provided indicating if the order is created or if there is not enough inventory
1. Reply to the prompt to continue with another order or to exit the application

# bamazonManager.js

1. run _node bamazonManager.js_ from a terminal session in the application directory
1. Four options are presented.
1. Use the up/down arrow keys to navigate thru the options

# bamazonSupevisor.js

1. run _node bamazonSupevisor.js_ from a terminal session in the application directory