//const yargs = require("yargs");
//const { hideBin } = require("yargs/helpers");

const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

//=========================== TEST ================================================================
//invokeAction({action: "list"})
//invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
//invokeAction({
//action: "add",
//name: "Anna Schmidt",
//email: "anna.anna@vestibul.co.uk",
//phone: "(992) 914-3862",
//});
//invokeAction({ action: "remove", id: "nCl9kedtp5Y8jWW2OZarF" });

//============ add convenient parsing of command line arguments ===================================
//const actionIndex = process.argv.indexOf("--action");

//if(actionIndex !== -1){
//const action = process.argv[actionIndex +1];
//invokeAction({action});
//}

//========================== add yargs ===================================
//const arr = hideBin(process.argv);
//const { argv } = yargs(arr);
//invokeAction(argv);

//========================== add commander =================================
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
