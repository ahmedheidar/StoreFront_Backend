import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";
import jwt from "jsonwebtoken";
const store = new OrderStore();

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as String;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as any);

    next();
  } catch (error) {
    res.status(401);
  }
};

const currentOrder = async (req: Request, res: Response) => {
  const userid = parseInt(req.params.userid);
  const currentOrders = await store.currentOrder(userid);
  res.json(currentOrders);
};

const completedOrders = async (req: Request, res: Response) => {
  const userid = parseInt(req.params.userid);
  const completedOrders = await store.completedOrders(userid);
  res.json(completedOrders);
};

const userRoutes = (app: express.Application) => {
  app.get("/orders/current/:userid", verifyAuthToken, currentOrder);
  app.get("/orders/completed/:userid", verifyAuthToken, completedOrders);
};

export default userRoutes;
