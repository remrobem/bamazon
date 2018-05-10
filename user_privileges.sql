DROP USER IF EXISTS 'bamazon_customer'@'localhost';
DROP USER IF EXISTS 'bamazon_manager'@'localhost';
DROP USER IF EXISTS 'bamazon_supervisor'@'localhost';


CREATE  USER  'bamazon_customer'@'localhost'  IDENTIFIED  BY  'BCtest1234!';
GRANT  SELECT  ON bamazon.products TO  'bamazon_customer'@'localhost';
GRANT  UPDATE  ON bamazon.products TO  'bamazon_customer'@'localhost';

CREATE  USER  'bamazon_manager'@'localhost'  IDENTIFIED  BY  'BCtest1234!';
GRANT  SELECT  ON bamazon.products TO  'bamazon_manager'@'localhost';
GRANT  UPDATE  ON bamazon.products TO  'bamazon_manager'@'localhost';
GRANT  INSERT  ON bamazon.products TO  'bamazon_manager'@'localhost';


CREATE  USER  'bamazon_supervisor'@'localhost'  IDENTIFIED  BY  'BCtest1234!';
GRANT  SELECT  ON bamazon.products TO  'bamazon_supervisor'@'localhost';
GRANT  SELECT  ON bamazon.departments TO  'bamazon_supervisor'@'localhost';
GRANT  INSERT  ON bamazon.departments TO  'bamazon_supervisor'@'localhost';