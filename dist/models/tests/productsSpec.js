"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.ProductStore();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create({
            id: 0,
            name: 'Black tshirt',
            price: 250,
            category: 'clothes'
        });
        expect(result).toEqual({
            id: 1,
            name: 'Black tshirt',
            price: 250,
            category: 'clothes',
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: 'Black tshirt',
                price: 250,
                category: 'clothes',
            }]);
    });
    it('show method should return the correct book', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Black tshirt',
            price: 250,
            category: 'clothes',
        });
    });
    it('delete method should remove the book', async () => {
        store.delete(1);
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
