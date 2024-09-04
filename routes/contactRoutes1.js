const express = require('express');
const router = express.Router();
const {getContact, createContact, getContacts, updateContact, deleteContact} = require("../controllers/contactcontrollers1");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getContact);

router.route("/").post(createContact)


router.route("/:id").get(getContacts);


router.route("/:id").put(updateContact);


router.route("/:id").delete(deleteContact);

module.exports = router;