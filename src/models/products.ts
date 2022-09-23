import Client from "../database";

export type Product = {
  id: Number;
  name: String;
  price: Number;
  category: String;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "Select * from product";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Cannot get Products " + err);
    }
  }

  async show(id: Number): Promise<Product> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const Product = result.rows[0];

      conn.release();

      return Product;
    } catch (err) {
      throw new Error(`Could not add new Product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM product WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const Product = result.rows[0];

      conn.release();

      return Product;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
}
