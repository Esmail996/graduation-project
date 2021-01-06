import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../../helpers";
import DishServices from "./service";

//MM-8
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, files } = req;
    const results = await DishServices.create(body, files);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

//MM-8
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryId = Number(req.query.category_id);
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await DishServices.read(categoryId, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

//MM-8
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser, body, files } = req;
    const results = await DishServices.update(currUser, body, files);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

//MM-8
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const dishId = Number(req.params.dish_id);
    const results = await DishServices.del(currUser, dishId);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

//MM-10
async function deleteImage(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const imageId = Number(req.params.image_id);
    const results = await DishServices.deleteImage(currUser, imageId);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

export default { create, read, update, del, deleteImage };