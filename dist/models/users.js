"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "Select * from users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error("Cannot get users " + err);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM Users WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = "INSERT INTO Users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            const User = result.rows[0];
            conn.release();
            return User;
        }
        catch (err) {
            throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
