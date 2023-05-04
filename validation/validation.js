import { body } from "express-validator";

export const registerValodstion = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const postCreateValodstion = [
  body("title", "Введите название новости").isLength({min: 3}).isString(),
  body("text", "Введите текст новости").isLength({ min: 5 }).isString(),
  body("tags", "Неверный формат тегов(укажите массив)").optional().isString(),
  body("imageURL", "Неверная ссылка на аватарку").optional().isString(),
];

export const loginValodstion = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];
