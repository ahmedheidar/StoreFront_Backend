import Client from "../database";

export type Order = {
  id: Number;
  order_status: String;
  user_id: Number;
};

export class OrderStore {
  async currentOrder(userid: Number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM Orders O inner join order_product OP on O.id=OP.order_id inner join product P on P.id=OP.product_id WHERE user_id=($1) AND order_status=($2)";
      const result = await conn.query(sql, [userid,'not complete']);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Orders for userid ${userid} ` + err);
    }
  }

  async completedOrders(userid: Number): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM Orders O inner join order_product OP on O.id=OP.order_id inner join product P on P.id=OP.product_id WHERE user_id=($1) AND order_status=($2)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [userid, "completed"]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find comlpeted Orders of user ${userid}. Error: ${err}`
      );
    }
  }
}
