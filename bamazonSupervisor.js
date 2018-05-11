let inquirer = require('inquirer');
let mysql = require('mysql');
let Table = require("cli-table");

const anotherActivityQuestion = [{
    name: "anotherActivity",
    type: "confirm",
    message: "Would you like to perform another activity? (hit Enter for Yes)",
    default: true
}];


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "bamazon_supervisor",
    password: "BCtest1234!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    processActivity();
});

// process request from user
function processActivity() {

    const chooseActivity = [
        {
            name: "activity",
            type: "list",
            message: "What activity would you like to perform?",
            choices: [
                'View Product Sales By Department',
                'Create New Department',
                'Exit'
            ],
            paginated: true
        }
    ];

    inquirer
        .prompt(chooseActivity)
        .then(function (answer) {
            switch (answer.activity) {

                case 'View Product Sales By Department':
                    viewSales();
                    break;
                case 'Create New Department':
                    addDepartment();
                    break;
                case 'Exit':
                    return connection.end();
                    break;

            }

        });
};

function viewSales() {

    const deptArr = new Table({
        head: ['Department Id', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
        colWidths: [15, 40, 16, 16, 16],
    });


    const query = "SELECT dept.department_id as dept_id, dept.department_name as dept_name, dept.over_head_costs as dept_overhead, SUM(prod.product_sales) as sales, SUM(prod.product_sales) - dept.over_head_costs as profit FROM departments as dept LEFT OUTER JOIN products as prod ON(dept.department_name = prod.department_name) GROUP BY dept.department_name ORDER BY dept.department_id ";

    connection.query(query, {}, function (err, res) {
   
        if (err) throw err;

        if (res.length) {
            res.forEach(prodDept => {

                if (!prodDept.sales) {
                    prodDept.sales = parseFloat(0);
                    prodDept.profit = parseFloat(prodDept.sales - prodDept.dept_overhead).toFixed(2);
                };
                // if (!prodDept.profit) {
                //     prodDept.profit = parseFloat(prodDept.product_sales - prodDept.dept_overhead).toFixed(2);
                // }
                prodDept.sales = parseFloat(prodDept.sales).toFixed(2);
                prodDept.profit = parseFloat(prodDept.profit).toFixed(2);
                deptArr.push(
                    [
                        prodDept.dept_id,
                        prodDept.dept_name,
                        prodDept.dept_overhead,
                        prodDept.sales,
                        prodDept.profit
                    ])
            });
            console.log(deptArr.toString());
            anotherActivity()
        };
    });
};

// add departement to the departments table. User is prompted for department data.
// department_id is auto generated per the database defintion
function addDepartment() {

    const addProduct = [{
        name: "addDeptName",
        type: "prompt",
        message: "Enter Department Name:"
    },
    {
        name: "addDeptOverhead",
        type: "prompt",
        message: "Enter Department Overhead Cost:",
        validate: ValidatePositive,
    }

    ];

    inquirer.prompt(addProduct)
        .then(answer => {
            query = "INSERT INTO departments (department_name, over_head_costs) values( ? , ? ) ";
            answer.addDeptOverhead = parseFloat(answer.addDeptOverhead).toFixed(2);
            connection.query(query, [answer.addDeptName, answer.addDeptOverhead], function (err, res) {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        console.log(`Department ${answer.addDeptName} already exists. Please try again with a unique department name`)
                    } else {
                        throw err;
                    };
                } else {
                    // expect one row to be added
                    if (res.affectedRows === 1) {
                        console.log(`Your department has been added and assigned item id ${res.insertId}`)
                    } else {
                        console.log(`Something went wrong. Rows updated: ${res.affected_rows}`)
                    }
                };
                anotherActivity()
            });
        });



};

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

function ValidateNumeric(value) {
    return !isNaN(value)
};

function ValidatePositive(value) {
    if (value >= 0 && !isNaN(value)) {
        return true;
    } else {
        return false;
    };
};