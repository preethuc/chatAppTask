import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import userRoute from "./Route/user-route"
import chatRoute from "./Route/chat-route"

const app = express();
app.use(morgan("dev"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("middleware working");
  next();
});
app.use('/api/chat', chatRoute)
app.use('/api/user',userRoute)


module.exports = app;
