// import { resolve } from 'url';

let inquirer = require('inquirer');
let mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "bamazon_user",
    // Your password
    password: "BCtest1234!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    placeOrder();
});


const anotherOrderQuestion = [{
    name: "anotherOrder",
    type: "confirm",
    message: "Would you like to place an order for another product? (hit Enter for Yes)",
    default: true
}];

function placeOrder() {

    // inquirer uses an object of value:name. name is display and the value is retrune when selected. 
    // The query returns the item_id as value and the concatenated item_id and product_name as the name. 
    // Doing this allows a product list to be created directly from the query results
    const productList = [{
        value: 'exit',
        name: 'exit'
    }];
    const query = "SELECT item_id as value, CONCAT(item_id, ' : ', product_name) as name FROM products ORDER BY item_id";

    connection.query(query, {}, function (err, res) {
        if (err) throw err;

        if (res.length) {
            res.forEach(product => {
                productList.push(product);
            });

            inquirer
                .prompt([{
                        name: "item_id",
                        type: "list",
                        message: "What product would you like to order?",
                        choices: productList,
                        paginated: true
                    },
                    {
                        name: "stock_quantity",
                        type: "input",
                        message: "How many would you like to order?",
                        validate: ValidateNumeric,
                        when: function (answers) {
                            return answers.item_id != 'exit';
                        }
                    }

                ])
                .then(function (answer) {
                    if (answer.item_id === 'exit') {
                        connection.end();
                        return;
                    }
                    // select stock and price data for the selected item
                    let query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
                    connection.query(query, [answer.item_id], function (err, res) {
                        if (err) throw err;
                        if (res.length) {

                            unitPrice = res[0].price;
                            orderQty = answer.stock_quantity;
                            stockQty = res[0].stock_quantity;
                            // make sure there is inventory to fill the request
                            if (orderQty <= stockQty) {
                                console.log('Great, we have enough inventory. Placing your order now.');

                                // reduce inventory by the amount ordered and tell the customer the total cost
                                // newQty = stockQty - orderQty;
                                totalPrice = parseFloat(orderQty * unitPrice).toFixed(2);

                                let query = "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?";

                                connection.query(query, [orderQty, totalPrice, answer.item_id], function (err, res) {
                                    if (err) throw err;
                                    // expect one row to be updated
                                    if (res.affected_rows = 1) {
                                        console.log(`The total price is ${totalPrice}`)
                                    } else {
                                        console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                                    }

                                    anotherOrder();

                                });
                                // if not enogh inventory, let the user know and end
                            } else {
                                console.log(`Sorry, we don't have enough inventory.`);
                                console.log(`You ordered ${answer.stock_quantity} and we have ${res[0].stock_quantity}`);
                                anotherOrder();
                            }
                        };
                    });
                });

        } else {
            console.log("Sorry, something went wrong. We could not find any products.");
            connection.end();
        };
    });

}


function anotherOrder() {
    inquirer.prompt(anotherOrderQuestion).then(answers => {

        if (answers.anotherOrder) {
            placeOrder();
        } else {
            console.log('Thank you for visiting');
            connection.end();
        }
    });
}

function ValidateNumeric(value) {
    return !isNaN(value)
};