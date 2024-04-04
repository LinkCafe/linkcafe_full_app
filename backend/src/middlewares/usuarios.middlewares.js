import {check} from 'express-validator'

export const middlewaresCreateUsers =[
    check('nombre_completo','nombre, campo oblogatorio').not().isEmpty().isLength({ min: 3, max: 100 }).isString(),
    check('correo','correo invalido').not().isEmpty().isEmail(),
    check('clave', 'la clave es de caracter obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }),
];
export const middlewaresUpdate=[
  check('nombre_completo','falta el nombre').optional().isLength({ min: 3, max: 100 }).isString().not().isEmpty(),
  check('correo','correo invalido').optional().isEmail().not().isEmpty(),
  check('clave','clave').optional().isLength({ min: 3, max: 100 }).isString().not().isEmpty(),
];
