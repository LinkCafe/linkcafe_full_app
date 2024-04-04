import { check } from "express-validator";

export const middlewaresShowArticles = [
    check('nombre','nombre, Campo obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }).isString(),
    check('enlace','enlace Obligatorio').not().isEmpty().isLength({ max: 225 }),
    check('autor','autor obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }),
    check('id_usuario','Usuario oblicagatorio').not().isEmpty().isInt()
];

export const middlewaresUpdateArticles = [
    check('nombre','nombre, Necesario').not().isEmpty().isLength({ min: 3, max: 100 }).isString().optional(),
    check('enlace','enlace Necesario').not().isEmpty().isLength({min: 3, max: 225 }).isString().optional(),
    check('autor','autor Obligatorio').not().isEmpty().isLength({ min:3, max: 100 }).isString().optional(),
    check('id_usuario','Usuario oblicagatorio').not().isEmpty().isInt().optional()
]
