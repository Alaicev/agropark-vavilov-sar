import express from "express";
import multers from "multer";
import mongoose from "mongoose";
import { registerValodstion, loginValodstion, postCreateValodstion } from "./validation/validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controler/userController.js";
import * as postController from "./controler/postController.js";
import cors from "cors"

mongoose
  .connect(
    "mongodb+srv://altarev12345:MrIkRXu2NEdEM2Au@cluster0.d01lftr.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch(() => console.log("DB error"));

const app = express();

const storage = multers.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  }, 
  filename : (_, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multers({ storage })

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/auth/login",loginValodstion, userController.Login);
app.post("/auth/register", registerValodstion, userController.Register);
app.get("/auth/me", checkAuth, userController.GetMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
});

app.get("/news", postController.GetAllPosts);
app.get("/news/:id", postController.GetOnePost);
app.post("/news" , checkAuth, postCreateValodstion, postController.CreatePost);
app.delete("/news/:id", checkAuth, postController.removePost);
app.patch("/news/:id", checkAuth, postCreateValodstion, postController.updatePost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
