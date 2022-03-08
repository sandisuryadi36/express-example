const path = require('path');
const fs = require('fs');
const Product = require('../models/productModel');

const viewAll = (req, res) => {
    if (req.query.search) {
        let text = req.query.search;
        Product.find({ name: { $regex: '.*' + text.toLowerCase() + '.*', $options: 'i' } }, (err, products) => {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    } else {
        Product.find({}, (err, products) => {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    }
}

const viewOne = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
}

const create = (req, res) => {
    const newProduct = new Product(req.body);
    const image = req.file;
    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);
        newProduct.image = {
            fileName: image.originalname,
            filePath: `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}`
        }
    } else {
        newProduct.image = {
            fileName: null,
            filePath: null
        }
    }
    newProduct.save((err, product) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Product successfully added',
            product
        });
    });
}

const update = (req, res) => {
    const image = req.file;
    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);

        Product.findById(req.params.id, (err, product) => {
            if (err) {
                res.send(err);
            }
            product.name = req.body.name;
            product.price = req.body.price;
            product.stock = req.body.stock;
            product.status = req.body.status;
            product.image = {
                fileName: image ? image.originalname : null,
                filePath: image ? `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}` : null
            }
            product.save((err, product) => {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'Product successfully updated',
                    product
                });
            });
        })
    } else {
        Product.updateOne({ _id: req.params.id }, { $set: req.body }, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Product successfully updated',
                product
            });
        })
    }
}

const drop = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Product successfully deleted' });
    });
}

module.exports = {
    viewAll,
    viewOne,
    create,
    update,
    drop,
}