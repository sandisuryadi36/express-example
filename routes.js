const router = require('express').Router();

router.get("/", (req, res) => {
    res.send({
        message: "Welcome to home page",
        status: "success",
        bio: `${req.protocol}://${req.headers.host}/bio`,
        json: {
            message: "Use json body to send data",
            link: `${req.protocol}://${req.headers.host}/json`
        }
    });
})

router.get("/bio", (req, res) => {
    res.send({
        name: "Sandi Suryadi",
        age: "29",
        hobbies: ["eating", "sleeping", "coding"]
    })
})

router.post("/json", (req, res) => { 
    res.json(req.body)
})


module.exports = router;