const { HttpError } = require("../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { controllersWrapper } = require("../decorators");

async function getAllBooks(req, res) {
  const data = await listContacts();
  res.json(data);
}

async function getBookById(req, res) {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    throw HttpError(404, `Contact with id ${req.params.contactId} not found!`);
  }
  res.json(data);
}

async function addBook(req, res) {
  const body = req.body;

  const data = await addContact(body);
  if (!data) {
    throw HttpError(409, `Contact with email ${body.email} already added`);
  }

  res.status(201).json(data);
}

async function updateBook(req, res) {
  const body = req.body;

  const data = await updateContact(req.params.contactId, body);
  if (!data) {
    throw HttpError(404, `Book with id ${req.params.contactId} not found!`);
  }

  res.json(data);
}

async function deleteBook(req, res) {
  const data = await removeContact(req.params.contactId);
  console.log(data);
  if (!data) {
    throw HttpError(400, `Contact with id ${req.params.contactId} not found!`);
  }

  res.json({
    message: `Contact with id ${req.params.contactId} are deleted!`,
  });
}

module.exports = {
  getAllBooks: controllersWrapper(getAllBooks),
  getBookById: controllersWrapper(getBookById),
  addBook: controllersWrapper(addBook),
  updateBook: controllersWrapper(updateBook),
  deleteBook: controllersWrapper(deleteBook),
};
