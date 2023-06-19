const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const selectedContact = await getContactById(id);
      return console.log(selectedContact);

    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(addedContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
