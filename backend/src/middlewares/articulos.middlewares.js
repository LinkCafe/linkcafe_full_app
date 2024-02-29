import { check } from "express-validator";

export const middlewaresShowArticles = [
    check('nombre','nombre, Campo obligatorio').not().isEmpty().isString(),
    check('enlace','enlace Obligatorio').not().isEmpty(),
    check('autor','autor obligatorio').not().isEmpty(),
];

export const middlewaresUpdateArticles = [
    check('nombre','nombre, Necesario').not().isEmpty(),
    check('enlace','enlace Necesario').optional(),
    check('autor','autor Obligatorio').not().isEmpty(),
]