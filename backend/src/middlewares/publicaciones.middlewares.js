import { check } from 'express-validator';

export const middlewaresCreatePublics = [
    check('nombre', 'nombre, campo obligatorio').not().isEmpty().isLength({ min: 3, max: 50 }),
    check('descripcion', 'Ingrese alguna descripcion').not().isEmpty(),
    check('imagen', 'Imagen opcional').optional().isLength({ max: 255 }),
    check('fuentes', 'Ingrese alguna fuente suministrada').not().isEmpty().isLength({ max: 100 }),
    check('tipo', 'Obligatorio registrar un tipo').not().isEmpty(),
    check('id_usuario', 'Id usuario obligatorio').not().isEmpty().isInt()
];

export const middlewaresUpdatePublics = [
    check('nombre', 'Nombre invalido').optional().isLength({ min: 3, max: 50 }),
    check('descripcion', 'Descripcion invalida').optional(),
    check('imagen', 'Imagen opcional').optional().isLength({ max: 255 }),
    check('fuentes', 'Fuente invalida').optional().isLength({ max: 100 }),
    check('tipo', 'Tipo invalido').optional(),
    check('id_usuario', 'Id usuario invalido').optional().isInt()
];