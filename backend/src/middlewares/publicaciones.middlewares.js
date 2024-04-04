import { check } from 'express-validator';

export const middlewaresCreatePublics = [
    check('nombre', 'nombre, campo obligatorio').not().isEmpty().isLength({ min: 2, max: 50 }),
    check('descripcion', 'Ingrese alguna descripcion').not().isEmpty(),
    check('imagen', 'Imagen opcional').optional().isLength({ max: 255 }),
    check('fuentes', 'Ingrese alguna fuente suministrada').not().isEmpty().isLength({ max: 100 }),
    check('tipo', 'Obligatorio registrar un tipo').not().isEmpty(),
    check('id_usuario', 'Id usuario obligatorio').not().isEmpty().isInt({ max: 11 })
];

export const middlewaresUpdatePublics=[
    check('nombre','Nombre invalido').not().isEmpty().optional().isLength({ min: 2, max: 50 }),
    check('descripcion','Descripcion invalida').not().isEmpty().optional(),
    check('imagen', 'Imagen opcional').not().isEmpty().optional().isLength({ max: 255 }),
    check('fuentes', 'Fuentes invalida').not().isEmpty().optional().isLength({ max: 100 }),
    check('tipo', 'Tipo invalido').not().isEmpty().optional(),
    check('id_usuario', 'Id usuario invalido').not().isEmpty().optional().isInt({ max: 11 })
];