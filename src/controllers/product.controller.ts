import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entity/product.entity";

const getProducts = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);
  const products = await repository.find();
  res.send(products);
};

const getProductById = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);
  const product = await repository.findOne(req.params.id);
  res.send(product);
};

const createProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);
  const product = await repository.save(req.body);
  res.send(product);
};

const updateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);
  const product = await repository.update(req.params.id, { ...req.body });
  res.send(product);
};

const deleteProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);
  await repository.delete(req.params.id);
  res.send(null);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
