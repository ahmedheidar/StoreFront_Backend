"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async currentOrder(userid) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM Orders O inner join order_product OP on O.id=OP.order_id inner join product P on P.id=OP.product_id WHERE user_id=($1) AND order_status=($2)";
            const result = await conn.query(sql, [userid, 'not complete']);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Orders for userid ${userid} ` + err);
        }
    }
    async completedOrders(userid) {
        try {
            const sql = "SELECT * FROM Orders O inner join order_product OP on O.id=OP.order_id inner join product P on P.id=OP.product_id WHERE user_id=($1) AND order_status=($2)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userid, "completed"]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find comlpeted Orders of user ${userid}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
