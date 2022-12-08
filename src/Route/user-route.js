import express from "express";
import {
  addContact,
  createUser,
  getAllUser,
  imageUpload,
} from "./../Controller/user-controller";
const router = express.Router();

router.route("/img").post(imageUpload);
router.route("/create").post(createUser);
router.route("/add/:id").put(addContact);
router.route("/all").get(getAllUser);

module.exports = router;
