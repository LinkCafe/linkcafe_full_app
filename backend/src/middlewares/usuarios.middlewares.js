import {check} from 'express-validator'

export const middlewaresCreateUsers =[
    check('nombre_completo','nombre, campo oblogatorio').not().isEmpty(),
    check('correo','correo invalido').isEmail().normalizeEmail(),
    check('clave', 'la clave es de caracter obligatorio').not().isEmpty(),
];
export const middlewaresUpdate=[
  check('nombre_completo','falta el nombre').optional(),
  check('correo','correo invalido').optional().isEmail().normalizeEmail(),
  check('clave','clave').optional(),
];