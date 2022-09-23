import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from 'jsonwebtoken'

const store = new UserStore();

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
    
    res.json(newuser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
};

export default userRoutes;
