import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entity/product.entity";

const getProducts = async (req: Request, res: Response) => {
  const take = 15;
  const page = +req.query.page || 1;
  const repository = getManager().getRepository(Product);
  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
  });
  res.send({
    data,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
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
