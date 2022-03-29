const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

connectDB();

const app = express();

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use("/uploads", express.static("uploads"));
app.use("/items", require("./routes/itemRoutes")); 
app.use("/users", require("./routes/userRoutes"));
app.use("/main", require("./routes/mainRoutes"));
app.use("/trade", require("./routes/tradeRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
