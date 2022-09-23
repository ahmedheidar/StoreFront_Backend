"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await store.show(id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };
    try {
        const newuser = await store.create(user);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
};
exports.default = userRoutes;
