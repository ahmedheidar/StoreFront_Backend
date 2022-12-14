"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "Select * from product";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error("Cannot get Products " + err);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = "INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const Product = result.rows[0];
            conn.release();
            return Product;
        }
        catch (err) {
            throw new Error(`Could not add new Product ${p.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const Product = result.rows[0];
            conn.release();
            return Product;
        }
        catch (err) {
            throw new Error(`Could not delete Product ${id}. Error: ${err}`);
        }
    }
    async byCategory(category) {
        try {
            const sql = "SELECT * FROM product WHERE category=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find any Product of Category ${category}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
