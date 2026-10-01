require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const helloRoutes = require("./routes/hello.routes");

const app = express();

app.use(express.json());

app.use("/", authRoutes);
app.use("/hello", helloRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});