const express = require("express");
const connectDb = require("./config/dbconnections");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes1"));
app.use("/api/users",require("./routes/userRoutes1"));

app.listen(port ,() => {
    console.log(`server is running on port ${port} `);
});