// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('HUMAN RESOURCER - EMPLOYEE TRACKER.');
  mainMenu();
});


// Main Menu
function mainMenu(){
    inquirer
    .prompt({
        name: "option",
        type: "list",
        message: "MAIN MENU",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role"
        ]
      })

      // Menu Selection Actions
      .then(function(selection) {
        switch (selection.option) {
            case "View all Departments":
              viewAllDepartments();
            break;
    
            case "View all Roles":
              viewAllRoles();
            break;
            case "View all Employees":
              viewAllEmployees();
            break;
          
            case "Add a Department":
                addDepartment();
            break;

            case "Add a Role":
                addRole();
            break;

            case "Add an Employee":
                addEmployee();
            break;    
      
            case "Update an Employee Role":
                updateEmployeeRole();
            break;    
            }
    });

}

// View All Departments
function viewAllDepartments() {
    db.query("SELECT name AS department, id AS DepartmentID from department;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    mainMenu()
    })
  }


// View All Roles
function viewAllRoles() {
    db.query("SELECT role.title AS Title, role.id AS RoleID, department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    mainMenu()
    })
  }

// View All Employees
function viewAllEmployees() {
    db.query("SELECT employee.id AS EmployeeID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    mainMenu()
    })
  }

// Add a Department
function addDepartment() {
    inquirer
    .prompt({
        name: "departmentName",
        type: "input",
        message: "Department Name:"
    })

    .then((response) => {
        db.query(`INSERT INTO department (name) VALUES ("${response.departmentName}");`, 
        function(err, res) {
        if (err) throw err
        console.table("Department Added Successfully!")
        mainMenu()
        })
    })

  }

// Add a Role
function addRole() {
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Role Title:"
        },
        {
            name: "salary",
            type: "input",
            message: "Role Salary:"
        },
        {
            name: "departmentID",
            type: "input",
            message: "Department ID:"
        }
    ])

    .then((response) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", ${response.salary}, ${response.departmentID});`, 
        function(err, res) {
        if (err) throw err
        console.table("Role Added Successfully!")
        mainMenu()
        })
    })

  }

  // Add an Employee
function addEmployee() {
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "First Name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Last Name:"
        },
        {
            name: "roleID",
            type: "input",
            message: "Role ID:"
        },
        {
            name: "managerID",
            type: "input",
            message: "Manager ID:"
        }
    ])

    .then((response) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", ${response.roleID}, ${response.managerID});`, 
        function(err, res) {
        if (err) throw err
        console.table("Employee Added Successfully!")
        mainMenu()
        })
    })

  }


    // Update an Employee's Role
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            name: "employeeID",
            type: "input",
            message: "Employee ID of Employee you would you like to Update:"
        },
        {
            name: "roleID",
            type: "input",
            message: "Role ID of new Role:"
        }
    ])

    .then((response) => {
        db.query(`UPDATE employee SET role_id = ${response.roleID} WHERE id = ${response.employeeID};`, 
        function(err, res) {
        if (err) throw err
        console.table("Employee Updated Successfully!")
        mainMenu()
        })
    })

  }