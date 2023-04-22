const { HttpError } = require("../helpers");

const { controllersWrapper } = require("../decorators");
const { Contact } = require("../models/contact");

async function getAllBooks(req, res) {
  const data = await Contact.find();
  res.json(data);
}

async function getBookById(req, res) {
  const data = await Contact.findById(req.params.contactId);
  if (!data) {
    throw HttpError(404, `Contact with id ${req.params.contactId} not found!`);
  }
  res.json(data);
}

async function addBook(req, res) {
  const alreadyAdded = await Contact.find({ email: req.body.email });

  if (alreadyAdded.length > 0) {
    throw HttpError(409, `Contact with email ${req.body.email} already added`);
  }

  const data = await Contact.create(req.body);
  res.status(201).json(data);
}

async function updateBook(req, res) {
  const data = await Contact.findByIdAndUpdate(req.params.contactId, req.body);
  if (!data) {
    throw HttpError(404, `Book with id ${req.params.contactId} not found!`);
  }

  res.json(data);
}

async function deleteBook(req, res) {
  const data = await Contact.findByIdAndDelete(req.params.contactId);
  if (!data) {
    throw HttpError(400, `Contact with id ${req.params.contactId} not found!`);
  }

  res.json({
    message: `Contact with id ${req.params.contactId} are deleted!`,
  });
}

async function updateFavoriteField(req, res) {
  const data = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
    new: true,
  });

  if (!data) {
    throw HttpError(400, `Contact with id ${req.params.contactId} not found!`);
  }

  res.json(data);
}

module.exports = {
  getAllBooks: controllersWrapper(getAllBooks),
  getBookById: controllersWrapper(getBookById),
  addBook: controllersWrapper(addBook),
  updateBook: controllersWrapper(updateBook),
  updateFavoriteField: controllersWrapper(updateFavoriteField),
  deleteBook: controllersWrapper(deleteBook),
};
