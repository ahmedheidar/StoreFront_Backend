import Client from "../database";

export type Order = {
  id: Number;
  order_status: String;
  user_id: String;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "Select * from orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Cannot get Orders " + err);
    }
  }

  async show(id: Number): Promise<Order> {
    try {
      const sql = "SELECT * FROM Orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO Orders (order_status, user_id) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.order_status,o.user_id]);

      const Order = result.rows[0];

      conn.release();

      return Order;
    } catch (err) {
      throw new Error(`Could not add new Order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM Orders WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const Order = result.rows[0];

      conn.release();

      return Order;
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }
}
