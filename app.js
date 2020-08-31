const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const fs = require("fs");
const employeeArray = new Array();

const managerQuestions = [  { type: "input",
                              name: "name",
                              message:"Enter manager's name:"},
                            { type: "input",
                              name: "id",
                              message:"Assign manager's ID number:"},
                            { type: "input",
                              name: "email",
                              message:"Enter manager's email address:"},
                            { type: "input",
                              name: "officeNumber",
                              message:"Enter manager's office number:"}];

const engineerQuestions = [  { type: "input",
                              name: "name",
                              message:"Enter engineer's name:"},
                            { type: "input",
                              name: "id",
                              message:"Assign engineer's ID number:"},
                            { type: "input",
                              name: "email",
                              message:"Enter engineer's email address:"},
                            { type: "input",
                              name: "GitHub",
                              message:"Enter engineer's GitHub:"},];

const internQuestions = [  { type: "input",
                              name: "name",
                              message:"Enter intern's name:"},
                            { type: "input",
                              name: "id",
                              message:"Assign intern's ID number:"},
                            { type: "input",
                              name: "email",
                              message:"Enter intern's email address:"},
                            { type: "input",
                              name: "school",
                              message:"Enter intern's school:"},];

const areThereMore = [ { type: "confirm",
                         name: "answer",
                         message:"Are there more engineers?:"},
                       { type: "confirm",
                         name: "answer",
                         message:"Are there more interns?:"} ]

                         
function fillManager()
{
     inquirer.prompt(managerQuestions).then(({name, id, email, officeNumber}) => {
          var manager = new Manager(name, id, email, officeNumber);
          employeeArray.push(manager);
          fillEngineers();
     });
}

function fillEngineers()
{
     inquirer.prompt(engineerQuestions).then(({name, id, email, GitHub}) => {
          var engineer = new Engineer(name, id, email, GitHub);
          employeeArray.push(engineer);
          areThereMoreEngineers();
     });
}

function fillInterns()
{
     inquirer.prompt(internQuestions).then(({name, id, email, school}) => {
          var intern = new Intern(name, id, email, school);
          employeeArray.push(intern);
          areThereMoreInterns();
     });
}
                         
function areThereMoreEngineers()
{
     inquirer.prompt(areThereMore[0]).then((answers) => {
          switch (answers.answer)
          {
               case true:
                    fillEngineers();
                    break;
               case false:
                    fillInterns();
                    break;
               default: console.log("Error: areThereMoreEngineers() failed to return boolean value");
          }
     });
}
                                   
function areThereMoreInterns()
{
     inquirer.prompt(areThereMore[1]).then((answers) => {
          switch (answers.answer)
          {
               case true:
                    fillInterns();
                    break;
               case false:
                    let html = render(employeeArray);
                    fs.writeFile(outputPath, html, "utf8", (err) => {
                         if (err) 
                           console.log(err); 
                         else { 
                              console.log(fs.readFileSync(outputPath, "utf8")); 
                              console.log("The written has the above contents.");
                              console.log("File written successfully to team.html\n");
                         }
                    });
                    break;
               default: console.log("Error: areThereMoreInterns() failed to return boolean value");
          }
     });
}
                                             
function init()
{
     fillManager();
}

init();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
