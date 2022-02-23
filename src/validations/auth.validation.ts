import { Joi } from "express-validation";

const registerValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
});

export default {
    registerValidation
};