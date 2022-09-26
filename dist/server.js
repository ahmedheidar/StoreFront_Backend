"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
const productHandler_1 = __importDefault(require("./handlers/productHandler"));
const ordersHandler_1 = __importDefault(require("./handlers/ordersHandler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use(cors_1.default);
app.get('/', function (req, res) {
    res.send('Hello World BRUHHH!');
});
(0, usersHandler_1.default)(app);
(0, productHandler_1.default)(app);
(0, ordersHandler_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
