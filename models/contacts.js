const fs = require("fs/promises");
const path = require("path");

const shortid = require("shortid");

const PATH = {
  contacts: path.join(__dirname, "contacts.json"),
};

const listContacts = async () => {
  const data = await fs.readFile(PATH.contacts);
  return JSON.parse(data);
};

const writeAllContacts = async (contacts) => {
  await fs.writeFile(PATH.contacts, JSON.stringify(contacts, null, 2), "utf8");
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const data = contacts.find(({ id }) => id === contactId);

  return data || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = contacts[index];
  await contacts.splice(index, 1);
  await writeAllContacts(contacts);
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  if (contacts.find((i) => i.email === email)) {
    return null;
  }

  contacts.push(newContact);
  await writeAllContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, name, email, phone };
  await writeAllContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
