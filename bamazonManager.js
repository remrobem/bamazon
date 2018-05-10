let inquirer = require('inquirer');
let mysql = require('mysql');
let Table = require("cli-table");

const anotherActivityQuestion = [{
    name: "anotherActivity",
    type: "confirm",
    message: "Would you like to perform another activity? (hit Enter for Yes)",
    default: true
}];

// MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "bamazon_manager",
    password: "BCtest1234!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    processActivity();
});

// process request from user
function processActivity() {

    inquirer
        .prompt([{
            name: "activity",
            type: "list",
            message: "What activity would you like to perform?",
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ],
            paginated: true
        }

        ])
        .then(function (answer) {
            switch (answer.activity) {

                case 'View Products for Sale':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addProduct();
                    break;
                case 'Exit':
                    return connection.end();
                    break;
            }
        });
};

// view all products. Uses package cli-table as Table to format the response
function viewProducts() {

    const productArr = new Table({
        head: ['Item', 'Product', 'Department', 'Price', 'Stock Quantity'],
        colWidths: [6, 40, 15, 9, 17],
    });

    const query = "SELECT * FROM products ORDER BY item_id";

    connection.query(query, {}, function (err, res) {
        if (err) throw err;

        if (res.length) {
            res.forEach(product => {
                productArr.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity])
            });
            console.log(productArr.toString());
            anotherActivity()
        };
    });
};

// view product inventory that is below an amount provided by the user
function viewInventory() {

    const lowInventoryQuantity = [{
        name: "lowInventoryQuantity",
        type: "prompt",
        message: "Show products with a stock quantity less than:",
        validate: ValidatePositive,
    }];

    const inventoryArr = new Table({
        head: ['Item', 'Product', 'Stock Quantity'],
        colWidths: [6, 40, 17],
    });

    const query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < ? ORDER BY item_id";

    inquirer.prompt(lowInventoryQuantity)
        .then(answer => {

            connection.query(query, [answer.lowInventoryQuantity], function (err, res) {
                if (err) throw err;

                if (res.length) {
                    res.forEach(product => {
                        inventoryArr.push([product.item_id, product.product_name, product.stock_quantity])
                    });
                    console.log(inventoryArr.toString());
                    anotherActivity();
                };
                console.log(`All products have a stock quantity of at least ${answer.lowInventoryQuantity}`);
                anotherActivity();
            });
        });
};

// add invetory to a product. User is prompted for product and quantity to add
function addInventory() {

    const addInventoryItem = [{
        name: "addInventoryItem",
        type: "prompt",
        message: "What item number:",
        validate: ValidatePositive
    },
    {
        name: "addInventoryQuantity",
        type: "prompt",
        message: "How much inventory to add:",
        validate: ValidatePositive,
    }
    ];

    inquirer.prompt(addInventoryItem)
        .then(answer => {
            query = "UPDATE products SET stock_quantity = stock_quantity + ? where item_id = ?";
            connection.query(query, [answer.addInventoryQuantity, answer.addInventoryItem], function (err, res) {
                if (err) throw err;
                // expect one row to be updated
                if (res.changedRows === 1) {
                    console.log(`The inventory has been updated`)
                } else {
                    console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                }
                anotherActivity()
            });
        });


};

// add new product. User is prompted for the required data. item_id is auto generated per the database definition
function addProduct() {

    const addProduct = [{
        name: "addProductName",
        type: "prompt",
        message: "Enter Product Name:"
    },
    {
        name: "addProductDept",
        type: "prompt",
        message: "Enter Department Name:"
    },
    {
        name: "addProductPrice",
        type: "prompt",
        message: "Enter Price:",
        validate: ValidatePositive,
    },
    {
        name: "addProductQuantity",
        type: "prompt",
        message: "Enter Stock Quantity:",
        validate: ValidatePositive,
    }
    ];


    inquirer.prompt(addProduct)
        .then(answer => {
            query = "INSERT INTO products (product_name, department_name, price, stock_quantity) values( ? , ? , ? , ?) ";
            connection.query(query, [answer.addProductName, answer.addProductDept, answer.addProductPrice, answer.addProductQuantity], function (err, res) {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        console.log(`Product ${answer.addProductName} already exists. Please try again with a unique product name`)
                    } else {
                        throw err;
                    };
                } else {
                    // expect one row to be added
                    if (res.affectedRows === 1) {
                        console.log(`Your product has been added and assigned item id ${res.insertId}`)
                    } else {
                        console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                    }
                };
                anotherActivity()
            });
        });



};

// prompt the user to continue with the application or exit
function anotherActivity() {
    inquirer.prompt(anotherActivityQuestion).then(answers => {

        if (answers.anotherActivity) {
            processActivity();
        } else {
            console.log('Good Bye');
            connection.end();
        }
    });
}


// validate input field is numeric and a positive number
function ValidatePositive(value) {
    if (value > 0 && !isNaN(value)) {
        return true;
    } else {
        return false;
    };
};