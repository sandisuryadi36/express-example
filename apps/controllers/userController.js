const User = require('../models/userModel');

const index = (req, res) => { 
    res.send({
        message: "Welcome to User API",
        status: "success",
        endPoint: {
            viewAll: {
                method: "GET",
                url: "/user"
            },
            create: {
                method: "POST",
                url: "/user"
            },
            update: {
                method: "PUT",
                url: "/user/:id",
                params: {
                    id: "id of user"
                }
            },
            delete: {
                method: "DELETE",
                url: "/user/:id",
                params: {
                    id: "id of user"
                }
            }
        }
    });
}

const viewAll = async (req, res) => {
    try {
        // await User.sync();
        const data = await User.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.send(error);
    }
}

const create = async (req, res) => {
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
    } catch (error) {
        res.send(error);
    }
}

const update = async (req, res) => { 
    const { id } = req.params;
    const { firstName, lastName, age, job } = req.body;
    try {
        await User.sync();
        const data = await User.update({
            firstName,
            lastName,
            age,
            job
        }, {
            where: {
                id
            }
        })
        res.status(200).send({
            message: "Success",
            data
        });
    } catch (error) {
        res.send(error);
    }
}

const deleteUser = async (req, res) => { 
    const { id } = req.params;
    try {
        await User.sync();
        const data = await User.destroy({
            where: {
                id
            }
        })
        res.status(200).send({
            message: "Success",
            data
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    index,
    viewAll,
    create,
    update,
    deleteUser
}