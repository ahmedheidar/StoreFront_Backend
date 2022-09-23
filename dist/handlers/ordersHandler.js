"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new orders_1.OrderStore();
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
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
    app.get("/orders/current/:userid", verifyAuthToken, currentOrder);
    app.get("/orders/completed/:userid", verifyAuthToken, completedOrders);
};
exports.default = userRoutes;
