"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const store = new users_1.UserStore();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
console.log(pepper);
const hash = bcrypt_1.default.hashSync("password123" + pepper, parseInt(saltRounds));
describe("User Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("create method should add a user", async () => {
        const result = await store.create({
            first_name: "Ahmed",
            last_name: "Salah",
            password: "password123",
        });
        const flag = bcrypt_1.default.compareSync("password123" + pepper, result.password);
        expect(flag).toBeTrue();
    });
    it("index method should return a list of users", async () => {
        const result = await store.index();
        const flag = bcrypt_1.default.compareSync("password123" + pepper, result[0].password);
        expect(flag).toBeTrue();
    });
    it("show method should return the correct user", async () => {
        const result = await store.show(1);
        const flag = bcrypt_1.default.compareSync("password123" + pepper, result.password);
        expect(flag).toBeTrue();
    });
});
