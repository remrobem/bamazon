# Application

## bamazon

## Description

This is a node application to:
* view and maintain product and department information
* view and maintain product and department information
* allow customer to place orders for products

## Requirements

1. Node.js must be installed (https://nodejs.org/en/download/)
1. MySQL must be installed. At a minimum, the free Community Edition must be present (https://www.mysql.com/downloads/) 
1. A MySQL developer tool such as MySQL Workbench or Sequel Pro (https://www.sequelpro.com/) is needed to create and seed the database

## Installation

1. Clone repository bamamzon from https://github.com/remrobem/bamazon
1. Open a terminal session for the directory where the application was cloned to
1. run *npm install* to install the dependencies
1. Use the *bamazaon.sql* file to create the databases in MySQL
1. Use the *bamazon_seed.sql* to create an initial set of data in MySQL
1. Use the *user_privileges.sql* file to create the MySQL users and privleges required by the application

## Use

There are 3 js files that can be run from a terminal session. Details on executing each of these is found in sections below.

1. `node bamazonCustomer.js`
    1. Create an order
1. `node bamazonManager.js`
    1. View products
    1. View products with low inventory
    1. Add Inventory to a Product
    1. Add a Product
1. `node bamazonSupevisor.js`
    1. View Product sales by Department
    1. Add a Department

## General Instructions

1. You must be in a terminal session for the directory that contains the application
1. Use the up/down arrow keys to navigate thru options and lists
1. Select an option or list item by pressing Enter or Return
1. The options and lists generally have an _Exit_ item that can be selected to exit the application
1. Ctrl+c or Command+c can be used to exist the application at any time

## bamazonCustomer.js

https://user-images.githubusercontent.com/11021578/39892072-6d8a9418-546d-11e8-935c-201eec73c6d3.gif

1. run _node bamazonCustomer.js_ from a terminal session in the application directory
1. A list of products is presented
1. Select a product to order
1. Once a product is selected, reply to the prompt with the quantity to order
1. A reply is provided indicating if the order is created or if there is not enough inventory
1. Reply to the prompt to continue with another order or to exit the application

## bamazonManager.js



1. run _node bamazonManager.js_ from a terminal session in the application directory
1. Four options are presented
1. **View products**
    1. A list of all products and details is presented
1. **View products with low inventory**
    1. Reply to the prompt with a quantity value
    1. A list is presented of all products with a stock quantity less than the quantity requested
1. **Add Inventory to a Product**
    1. Rely to the prompts to provide a product item number and the additional inventory
    1. The product item number must exist
1. **Add a Product**
    1. Rely to the prompts with the requested product information
    1. A product item number is automatically generated
    1. Product name must be unique

## bamazonSupervisor.js

1. run _node bamazonSupevisor.js_ from a terminal session in the application directory
1. Two options are presented
1. **View Product sales by Department**
    1. A list of product sales and profits for each department is presented
1. **Add a Department**
    1. Rely to the prompts with the requested department information
    1. A department item number is automatically generated
    1. Department name must be unique

# Technical Information

## Database
1. MySQL is used as the database
2. Details for the database, tables and users can be found in the *.sql files

## Packages
1. cli-table    provides formatting to display list data in a table (https://www.npmjs.com/package/cli-table)
1. inquirer     provides framework for user prompts (https://www.npmjs.com/package/inquirer)
1. mysql        provides connection to MySQL database (https://www.npmjs.com/package/node-mysql)