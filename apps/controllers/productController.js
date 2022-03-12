const path = require('path');
const fs = require('fs');
const Product = require('../models/productModel');

// get all controller
const viewAll = (req, res) => {
    if (req.query.search) {
        console.log(req.query.search);
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

// get one controller
const viewOne = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
}

// post controller
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

// put controller
const update = (req, res) => {
    const image = req.file;
    const updatedProduct = req.body;

    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);
        updatedProduct.image = {
            fileName: image.originalname,
            filePath: `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}`
        }
    }
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: updatedProduct },{new: true}, (err, product) => { 
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Product successfully updated',
            product
        });
    })
}

// delete controller
const remove = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Product successfully deleted',
            product
        });
    });
}

module.exports = {
    viewAll,
    viewOne,
    create,
    update,
    remove,
}