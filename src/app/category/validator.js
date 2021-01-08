import Joi from "joi";

//MM-7
const create = Joi.object({
  body: Joi.object({
    menuId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});
//MM-7
const read = Joi.object({
  query: Joi.object({
    menuId: Joi.number().required(),
    page: Joi.number(),
    size: Joi.number(),
    q: Joi.string(),
  }),
});
//MM-7
const update = Joi.object({
  body: Joi.object({
    categoryId: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
  }).required(),
});

export default { create, read, update };
