const path = require('path');
const fs = require('fs');
const User = require('../models/userModel');

const sync = { alter: true }

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
        const data = await User.findAll();
        res.status(200).send(data);
    } catch (error) {
        res.send(error);
    }
}

const viewOne = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await User.findOne({
            where: {
                id
            }
        })

        if (data) {
            res.status(200).send(data);
        } else { 
            res.status(404).send({
                message: "User not found"
            });
        }
    } catch (error) {
        res.send(error);
    }
}

const create = async (req, res) => {
    const { firstName, lastName, age, job } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);
    }
    try {
        await User.sync(sync);
        const data = await User.create({
            firstName,
            lastName,
            age,
            job,
            img_url: image ? `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` : null
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
    const image = req.file;
    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);
    }
    try {
        await User.sync(sync);
        const data = await User.update({
            firstName,
            lastName,
            age,
            job,
            img_url: image ? `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` : null
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
        await User.sync(sync);
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
    viewOne,
    create,
    update,
    deleteUser
}