import User from "./../Model/user-model";
import fs from "fs";

//profileImage Upload - Express-fileupload
export const imageUpload = async (req, res) => {
  try {
    const filename = Date.now() + "_" + req.files.profile_image.name;
    const file = req.files.profile_image;
    console.log(file);
    let path = "./uploadImage/" + req.query.dir_name;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    let uploadPath = "./uploadImage/" + req.query.dir_name + "/" + filename;
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(400).json({
          status: "fail",
          error: err,
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Image Uploaded",
          image: uploadPath,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      Message: "Error",
      Error: err.message,
    });
  }
};

//POST - create User
export const createUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
    return res.status(201).json({
      status: "Success",
      message: "User created",
      Data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error",
      error: err.message,
    });
  }
};

//GET -  All User
export const getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).json({
      status: "Success",
      message: "All Users",
      Data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error",
      error: err.message,
    });
  }
};
