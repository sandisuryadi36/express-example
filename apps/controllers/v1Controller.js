const path = require('path');
const fs = require('fs');
const db = require('../../config/mongoDB');
const { ObjectId } = require('mongodb');

// get all controller
const viewAll = (req, res) => { 
    if (req.query.search) {
        let text = req.query.search;
        db.collection('products').find({ name: { $regex: '.*' + text.toLowerCase() + '.*', $options: 'i' } }).toArray((err, products) => { 
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    } else {
        db.collection('products').find({}).toArray((err, products) => { 
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    }
}

// get one controller
const viewOne = (req, res) => { 
    db.collection('products').findOne({ _id: ObjectId(req.params.id) }, (err, product) => { 
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
}

// post controller
const create = (req, res) => { 
    const newProduct = req.body;
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
    db.collection('products').insertOne(newProduct, (err, product) => { 
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Product successfully added',
            product
        });
    });
}

// patch controller
const update = (req, res) => { 
    const image = req.file;
    if (image) {
        const target = path.join("uploads", image.originalname)
        fs.renameSync(image.path, target);

        const updatedProduct = req.body;
        updatedProduct.image = {
            fileName: image.originalname,
            filePath: `${req.protocol}://${req.headers.host}/public/${encodeURI(image.originalname)}`
        }
        db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, {$set : updatedProduct} , (err, product) => { 
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Product successfully updated',
                product
            });
        });
    } else {
        const updatedProduct = req.body;
        db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: updatedProduct }, (err, product) => { 
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Product successfully updated',
                product
            });
        });
    }
}

// delete controller
const remove = (req, res) => { 
    db.collection('products').deleteOne({ _id: ObjectId(req.params.id) }, (err, product) => { 
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
    remove
}