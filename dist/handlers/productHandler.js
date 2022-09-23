"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const productsByCategory = async (req, res) => {
    const products = await store.byCategory(req.params.category);
    res.json(products);
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("/products", destroy);
    app.get("/products/category/:category", productsByCategory);
};
exports.default = productRoutes;
