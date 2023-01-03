const fs = require("fs").promises;
const { constants } = require("buffer");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
const getContactsList = async function () {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = await JSON.parse(data);
    return dataParse;
  } catch (error) {
    console.log(`Error ${error} during reading file `);
  }
};
// TODO: задокументировать каждую функцию
async function listContacts() {
  const contacts = await getContactsList();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContactsList();
  const findedId = contacts.find(({ id }) => parseInt(id) === contactId);
  console.log(findedId);
}

async function removeContact(contactId) {
  const contacts = await getContactsList();
  const deletedContacts = contacts.filter(
    ({ id }) => parseInt(id) !== contactId
  );
  const parsedData = JSON.stringify(deletedContacts);
  await fs.writeFile(contactsPath, parsedData, "utf8");
  console.table(deletedContacts);
}

async function addContact(name, email, phone) {
  const contacts = await getContactsList();
  const data = { id: String(contacts.length + 1), name, email, phone };
  contacts.push(data);
  const parsedData = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, parsedData, "utf8");
  console.log(data);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
