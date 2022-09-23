import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: Number;
  first_name: String;
  last_name: String;
  password: String;
};

const pepper = process.env.BCRYPT_PASSWORD as any;
const saltRounds = process.env.SALT_ROUNDS as any;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "Select * from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Cannot get users " + err);
    }
  }

  async show(id: Number): Promise<User> {
    try {
      const sql = "SELECT * FROM Users WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO Users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`);
    }
  }
}
