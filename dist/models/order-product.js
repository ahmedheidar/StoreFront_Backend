"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order_ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class Order_ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "Select * from Order_Product";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error("Cannot get Order_Product " + err);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM Order_Product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Order_Product ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = "INSERT INTO Order_Products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.quantity, o.order_id, o.product_id]);
            const Order_Product = result.rows[0];
            conn.release();
            return Order_Product;
        }
        catch (err) {
            throw new Error(`Could not add new Order_Product ${o.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM Order_Products WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const Order_Product = result.rows[0];
            conn.release();
            return Order_Product;
        }
        catch (err) {
            throw new Error(`Could not delete Order_Product ${id}. Error: ${err}`);
        }
    }
}
exports.Order_ProductStore = Order_ProductStore;
