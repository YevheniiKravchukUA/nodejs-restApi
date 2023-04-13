const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../../controllers/contacts");

const { bodyValidator } = require("../../decorators");
const { contactSchema } = require("../../schemas");

router.get("/", getAllBooks);

router.get("/:contactId", getBookById);

router.post("/", bodyValidator(contactSchema), addBook);

router.delete("/:contactId", deleteBook);

router.put("/:contactId", bodyValidator(contactSchema), updateBook);

module.exports = router;
