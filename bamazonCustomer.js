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
    processRequest();
});


// function main() {
//     return new Promise( resolve => processRequest());
// }
// async function asyncCall() {
//     let wait = await main();
//     connectionEnd();
// }

// asyncCall();

// function connectionEnd() {
//     connection.end();
// }

function processRequest() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What activity would you like to perform?",
            choices: [
                "Place an order",
                "Nothing",
                "test"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Place an order":
                    placeOrder();
                    break;
                case "Nothing":
                    connection.end();
                    break;

                case "test":
                    test();
                    break;

                default:
                    throw new Error("Unknown activity");
            }
        });
}

function placeOrder() {


    // select using as so the array returned can be used in choices for inquirer
    let productList = [];
    let query = "SELECT item_id as value, product_name as name FROM products ORDER BY item_id";

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
                        validate: ValidateNumeric
                    }
                ])
                .then(function (answer) {
                    // console.log(answer);
                    // let query = "SELECT stock_quantity, price FROM products WHERE ?";
                    // connection.query(query, {
                    //     item_id: answer.item_id
                    // }, function (err, res) {

                    let query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
                    connection.query(query, [answer.item_id], function (err, res) {
                        if (err) throw err;
                        if (res.length) {

                            unitPrice = res[0].price;
                            orderQty = answer.stock_quantity;
                            stockQty = res[0].stock_quantity;

                            if (orderQty <= stockQty) {
                                console.log('Great, we have enough inventory. Placing yur order now.');


                                // reduce inventory by the amount ordered and tell the customer the total cost
                                let newQty = stockQty - orderQty;
                                let totalPrice = orderQty * unitPrice;

                                let query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                                connection.query(query, [newQty, answer.item_id], function (err, res) {
                                    if (err) throw err;
                                    if (res.affected_rows = 1) {
                                        console.log(`The total price is ${totalPrice}`)
                                    } else {
                                        console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                                    }
                                });

                            } else {
                                console.log(`Sorry, we don't have enough inventory.`);
                                console.log(`You ordered ${answer.stock_quantity} and we only have ${res[0].stock_quantity}`);
                            }
                        };
                    });
                });

        } else {
            console.log("Sorry, something went wrong. We could not find any products.");
        };
    });

}

function ValidateNumeric(value) {
    return !isNaN(value)
};

function test() {
    var choices = Array.apply(0, new Array(26)).map((x, y) => String.fromCharCode(y + 65));
    choices.push('Multiline option \n  super cool feature');
    choices.push({
        name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
        value: 'foo',
        short: 'The long option'
    });

    inquirer
        .prompt([{
                type: 'list',
                name: 'letter',
                message: "What's your favorite letter?",
                paginated: true,
                choices: choices
            },
            {
                type: 'checkbox',
                name: 'name',
                message: 'Select the letter contained in your name:',
                paginated: true,
                choices: choices
            }
        ])
        .then(answers => {
            console.log(JSON.stringify(answers, null, '  '));
        });



}