import * as contactsService from './contacts.js';
import { Command } from 'commander';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, name, phone, email, id }) => {
    switch(action) {
        case "list":
            const contactsList = await contactsService.getAllContacts();
            return console.table(contactsList);
        case "get":
            const contact = await contactsService.getContactById(id);
            return console.table(contact);
        case "add": 
            const newContact = await contactsService.addContact({name, email, phone})
            return console.table(newContact);
        case "remove": 
            const deletedContact = await contactsService.deleteContact(id);
            return console.table(deletedContact);
        default:
            console.log("Unknown action");
    }
}

//invokeAction({action: "contacts"});
//invokeAction({action: "getById", id: "e6ywwRe4jcqxXfCZOj_1e"});
//invokeAction({action: "add", name: "Andrew", email: "test@test.com", phone: "777888877"})
//invokeAction({action: "delete", id: "e6ywwRe4jcqxXfCZOj_1e"})
//invokeAction({action: "update", id: "rsKkOQUi80UsgVPCcLZZW", name: "GoIt", email: "Donec.elementum@scelerisquescelerisquedui.net", phone: "770"})
//npm start

invokeAction(argv);