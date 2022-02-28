const User = require('./apps/models/userModel');

const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
        // await User.sync();
        const data = await User.findAll();
        res.status(200).send(data);
    } catch(error) {
        res.send(error);
    }
})

router.post("/user", async (req, res) => {
    const { firstName, lastName, age, job } = req.body;
    try {
        await User.sync();
        const data = await User.create({
            firstName,
            lastName,
            age,
            job
        })
        res.status(200).send({
            message: "Success",
            data
        });
    } catch(error) {
        res.send(error);
    }
})


module.exports = router;