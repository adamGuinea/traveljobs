const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const profileRoutes = require('./routes/api/profile');

connectDB();

//init body parsing
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", profileRoutes);
app.use("/api/posts", require("./routes/api/posts"));

//serve production assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("listening"));
