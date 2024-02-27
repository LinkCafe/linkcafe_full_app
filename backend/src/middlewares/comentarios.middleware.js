import {check} from 'express-validator'

export const middlewaresCreateComentario =[
    check('comentario','comentario, campo oblogatorio').not().isEmpty(),
    check('id_usuario','usuario invalido').not().isEmpty().isInt(),
    check('id_publicacion', 'publicacion no encontrada').not().isEmpty().isInt()
];
export const middlewaresUpdateComentario=[
  check('comentario','comentario, campo oblogatorio').optional(),
  check('id_usuario','usuario invalido').optional().isInt(),
  check('id_publicacion', 'publicacion no encontrada').optional().isInt()
];