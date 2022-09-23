import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from 'jsonwebtoken'

const store = new UserStore();

const verifyAuthToken = (req: Request, res: Response, next:any) => {
  try {
      const authorizationHeader = req.headers.authorization as String
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as any)

      next()
  } catch (error) {
      res.status(401)
  }
}

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await store.show(id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password:req.body.password
  }
  try {

    const newuser = await store.create(user);
    var token = jwt.sign({user: newuser}, process.env.TOKEN_SECRET as any);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken,index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", verifyAuthToken, create);
};

export default userRoutes;
