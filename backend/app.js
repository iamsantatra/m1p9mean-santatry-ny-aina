const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./configs/db.config")
const utilisateurRoutes = require("./routes/utilisateur.routes");
const restaurantRoutes = require("./routes/restaurant.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(db.url)
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: createdPost._id
//     });
//   });
// });

// app.get("/api/utilisateurs", (req, res, next) => {
//   Utilisateur.find().then(documents => {
//     res.status(200).json({
//       message: "Listes des utilisateurs",
//       posts: documents
//     });
//   });
// });

// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

app.use("/api/utilisateur", utilisateurRoutes);
app.use("/api/restaurant", restaurantRoutes);
module.exports = app;
