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
    check('nombre','Nombre invalido').optional(),
    check('descripcion','Descripcion invalida').optional(),
    check('imagen', 'Imagen opcional').optional(),
    check('fuentes', 'Fuentes invalida').optional(),
    check('tipo', 'Tipo invalido').optional(),
    check('id_usuario', 'Id usuario invalido').optional().isInt({ max: 11 })
];