const express = require("express");
const { bodyValidator } = require("../../decorators");
const schemas = require("../../models/contact");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.getAllBooks);

router.get("/:contactId", controllers.getBookById);

router.post("/", bodyValidator(schemas.contactJoiSchema), controllers.addBook);

router.delete("/:contactId", controllers.deleteBook);

router.put(
  "/:contactId",
  bodyValidator(schemas.contactJoiSchema),
  controllers.updateBook
);

router.patch(
  "/:contactId/favorite",
  bodyValidator(schemas.updateFavoriteInContactSchema),
  controllers.updateFavoriteField
);

module.exports = router;
