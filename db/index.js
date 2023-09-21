import fs from 'fs/promises'
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve("db", "contacts.json")

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
}

export const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
}

export const addContact = async ({name, email, phone}) => {
    const contacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

export const updateById = async(id, { name, email, phone }) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, name, email, phone};
    console.log(contacts[index])
    await updateContacts(contacts);
    return contacts[index];
}

export const deleteContact = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}