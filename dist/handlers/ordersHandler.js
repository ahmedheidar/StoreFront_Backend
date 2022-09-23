"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const store = new orders_1.OrderStore();
const currentOrder = async (req, res) => {
    const userid = parseInt(req.params.userid);
    const currentOrders = await store.currentOrder(userid);
    res.json(currentOrders);
};
const completedOrders = async (req, res) => {
    const userid = parseInt(req.params.userid);
    const completedOrders = await store.completedOrders(userid);
    res.json(completedOrders);
};
const userRoutes = (app) => {
    app.get("/orders/current/:userid", currentOrder);
    app.get("/orders/current/:userid", completedOrders);
};
exports.default = userRoutes;
