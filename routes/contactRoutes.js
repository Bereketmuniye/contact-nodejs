const express = require("express");

const router = express.Router();

const{getContact,createContact,updateContact,deleteContact,getContactById}=require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.get("/", getContact).post("/", createContact);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;