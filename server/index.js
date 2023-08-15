require("dotenv").config();
const express = require("express");

//khoi tao mongoose
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");

//Connect with DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnn.jkrv045.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));
