import express from "express";
import {
  createChat,
  getAllChat,
  getLastMessageList,
} from "../Controller/chat-controller";
const router = express.Router();

router.route("/create").post(createChat);
router.route("/all").get(getAllChat);
router.route("/msg/:id").get(getLastMessageList);

module.exports = router;
