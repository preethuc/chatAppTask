import express from "express";
import { createChat, getAllChat } from "../Controller/chat-controller";
const router = express.Router();
router.route("/create").post(createChat);
router.route("/all").get(getAllChat);

module.exports = router;
