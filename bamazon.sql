-- Drops the db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect this database --
USE bamazon;


CREATE TABLE products (
 
  item_id INTEGER(10) not null auto_increment,
  product_name VARCHAR(100) NOT NULL UNIQUE,
  department_name VARCHAR(100) NOT NULL,
  price decimal(10,2)  NOT NULL,
  stock_quantity integer(10)  NOT NULL,
  
   PRIMARY KEY(item_id)
 
);