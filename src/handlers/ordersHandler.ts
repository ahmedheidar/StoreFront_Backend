import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";

const store = new OrderStore();


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
  app.get("/orders/current/:userid", currentOrder);
  app.get("/orders/current/:userid", completedOrders);
};

export default userRoutes;
