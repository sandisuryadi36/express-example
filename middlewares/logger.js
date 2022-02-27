const logger = (req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = req.path;
    const method = req.method;
    const statusCode = res.statusCode;
    console.log(`${time} ${method} ${path} ${statusCode}`);
    next();
}

module.exports = logger;