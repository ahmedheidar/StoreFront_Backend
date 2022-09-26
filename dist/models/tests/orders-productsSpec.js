"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../order-product");
const store = new order_product_1.Order_ProductStore();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.delete).toBeDefined();
    });
});
