-- create data from the bamazon database --

-- Makes it so all of the following code will affect this database --
USE bamazon;

-- create data from the products table in the bamazon database --

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('couch - 2 cushion leather', 'living room', 899.99, 12, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('couch - 3 cushion leather', 'living room', 1299.99, 7, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('table - kitchen', 'kitchen', 499.99, 8, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('chair - kitchen tabe', 'kitchen', 49.99, 24, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('desk - student', 'office', 399.99, 11, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('desk - business', 'office', 599.99, 100, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('notebook - 3 subject 300 pages', 'paper', 3.99, 79, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('notebook - 5 subject 500 pages', 'paper', 9.99, 56, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - blue', 'supplies', 0.99, 516, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - black', 'supplies', 0.99, 516, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - red', 'supplies', 0.99, 516, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('couch - 4 cushion leather', 'living room', 899.99, 12, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('couch - 5 cushion leather', 'living room', 1299.99, 7, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('table - kitchen long', 'kitchen', 499.99, 8, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('chair - kitchen table wide', 'kitchen', 49.99, 24, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('desk - student wide', 'office', 399.99, 11, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('desk - business glass', 'office', 599.99, 100, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('notebook - binder 3 subject 300 pages', 'paper', 3.99, 79, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('notebook - binder 5 subject 500 pages', 'paper', 9.99, 56, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - blue click', 'supplies', 0.99, 516, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - black click', 'supplies', 0.99, 516, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
 
VALUES ('pen - red click', 'supplies', 0.99, 516, 0);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('supplies', 2000);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ('paper', 2500);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ('kitchen', 3500);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ('living room', 1500);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ('office', 1000);
