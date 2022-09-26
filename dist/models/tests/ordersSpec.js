"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const store = new orders_1.OrderStore();
describe("Product Model", () => {
    it('should have an completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    });
    it('should have a currentOrder method', () => {
        expect(store.currentOrder).toBeDefined();
    });
});
