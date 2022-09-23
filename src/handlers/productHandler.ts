import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products";
import jwt from 'jsonwebtoken'

const store = new ProductStore();

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
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await store.show(id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const productsByCategory = async (req: Request, res: Response) => {
    const products = await store.byCategory(req.params.category)
    res.json(products)
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products", verifyAuthToken, destroy);
  app.get("/products/category/:category", productsByCategory);
};

export default productRoutes;
