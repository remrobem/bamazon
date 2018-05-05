-- Drops the db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect this database --
USE bamazon;


CREATE TABLE products (
 
  item_id INTEGER(10) not null auto_increment,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price decimal(10,2)  NOT NULL,
  stock_quantity integer(10)  NOT NULL,
  
   PRIMARY KEY(item_id)
 
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('couch - 2 cushion leather', 'living room', 899.99, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('couch - 3 cushion leather', 'living room', 1299.99, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('table - kitchen', 'kitchen', 499.99, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('chair - kitchen tabe', 'kitchen', 49.99, 24);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('desk - student', 'office', 399.99, 14);


