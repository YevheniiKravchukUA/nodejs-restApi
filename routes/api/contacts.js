const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  updateFavoriteField,
} = require("../../controllers/contacts");

const { bodyValidator } = require("../../decorators");
const schemas = require("../../schemas");

router.get("/", getAllBooks);

router.get("/:contactId", getBookById);

router.post("/", bodyValidator(schemas.contactSchema), addBook);

router.delete("/:contactId", deleteBook);

router.put("/:contactId", bodyValidator(schemas.contactSchema), updateBook);

router.patch(
  "/:contactId/favorite",
  bodyValidator(schemas.updateFavoriteInContactSchema),
  updateFavoriteField
);

module.exports = router;
