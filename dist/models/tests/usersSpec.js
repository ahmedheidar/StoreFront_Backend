"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const store = new users_1.UserStore();
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
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a user", async () => {
        const result = await store.create({
            id: 1,
            first_name: "Ahmed",
            last_name: "Salah",
            password: "password123",
        });
        expect(result).toEqual({
            id: 1,
            first_name: "Ahmed",
            last_name: "Salah",
            password: "password123",
        });
    });
    it("index method should return a list of users", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                first_name: "Ahmed",
                last_name: "Salah",
                password: "password123",
            },
        ]);
    });
    it("show method should return the correct user", async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            first_name: "Ahmed",
            last_name: "Salah",
            password: "password123",
        });
    });
    it("delete method should remove the user", async () => {
        store.delete(1);
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                first_name: "Ahmed",
                last_name: "Salah",
                password: "password123",
            },
        ]);
    });
});
