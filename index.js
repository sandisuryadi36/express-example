const express = require('express');
const router = require('./routes');
const app = express();
const logger = require('morgan');

// get environment variables
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("tiny"), router)

// 404 error
app.use((req, res) => {
    res.status(404).send({
        message: "Page not found",
        status: "error"
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});