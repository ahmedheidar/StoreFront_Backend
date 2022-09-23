import { User, UserStore } from '../users';
import bcrypt from "bcrypt";


const store = new UserStore()
const pepper = process.env.BCRYPT_PASSWORD as any;
const saltRounds = process.env.SALT_ROUNDS as any;
console.log(pepper)
const hash = bcrypt.hashSync("password123" + pepper, parseInt(saltRounds));


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
        const flag = bcrypt.compareSync("password123"+pepper, result.password as string)
        expect(flag).toBeTrue();
    });
    it("index method should return a list of users", async () => {
        const result = await store.index();
        const flag = bcrypt.compareSync("password123"+pepper, result[0].password as string)
        expect(flag).toBeTrue();
    });
    it("show method should return the correct user", async () => {
        const result = await store.show(1);
        const flag = bcrypt.compareSync("password123"+pepper, result.password as string)
        expect(flag).toBeTrue();
    });
});