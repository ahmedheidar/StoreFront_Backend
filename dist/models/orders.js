"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "Select * from orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error("Cannot get Orders " + err);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM Orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = "INSERT INTO Orders (order_status, user_id) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.order_status, o.user_id]);
            const Order = result.rows[0];
            conn.release();
            return Order;
        }
        catch (err) {
            throw new Error(`Could not add new Order ${o.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM Orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const Order = result.rows[0];
            conn.release();
            return Order;
        }
        catch (err) {
            throw new Error(`Could not delete Order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
