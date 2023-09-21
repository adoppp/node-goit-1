import * as contactsService from './db/index.js';

const invokeAction = async ({ action, name, phone, email, id }) => {
    switch(action) {
        case "contacts":
            const contactsList = await contactsService.getAllContacts();
            return console.table(contactsList);
        case "getById":
            const contact = await contactsService.getContactById(id);
            return console.table(contact);
        case "add": 
            const newContact = await contactsService.addContact({name, email, phone})
            return console.table(newContact);
        case "delete": 
            const deletedContact = await contactsService.deleteContact(id);
            return console.table(deletedContact);
        case "update": 
            const update = await contactsService.updateById(id, {name, email, phone});
            return console.table(update)
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