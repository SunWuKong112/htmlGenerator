const Employee = require("./Employee");

class Engineer extends Employee
{
     constructor(name, id, email, GitHub)
     {
          super(name, id, email);
          this.role = "Engineer";
          this.name = name;
          this.id = id;
          this.email = email;
          this.GitHub = GitHub;
     }
     getRole()
     {
          return this.role;
     }
     getGitHub()
     {
          return this.GitHub;
     }
}

module.exports = Engineer;