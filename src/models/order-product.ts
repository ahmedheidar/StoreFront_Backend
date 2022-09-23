import Client from "../database";

export type Order_Product = {
  id: Number;
  quantity: Number;
  order_id: Number;
  product_id: Number;
};

export class Order_ProductStore {
  async index(): Promise<Order_Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "Select * from Order_Product";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Cannot get Order_Product " + err);
    }
  }

  async show(id: Number): Promise<Order_Product> {
    try {
      const sql = "SELECT * FROM Order_Product WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order_Product ${id}. Error: ${err}`);
    }
  }

  async create(o: Order_Product): Promise<Order_Product> {
    try {
      const sql =
        "INSERT INTO Order_Products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.quantity,o.order_id,o.product_id]);

      const Order_Product = result.rows[0];

      conn.release();

      return Order_Product;
    } catch (err) {
      throw new Error(`Could not add new Order_Product ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order_Product> {
    try {
      const sql = "DELETE FROM Order_Products WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const Order_Product = result.rows[0];

      conn.release();

      return Order_Product;
    } catch (err) {
      throw new Error(`Could not delete Order_Product ${id}. Error: ${err}`);
    }
  }
}
