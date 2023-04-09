const express = require('express');
const router = express.Router();
const{check}=require('express-validator');
const{validarInputs}=require('../middleware/validarInputs')


const {getEntries,getArticulo,createEntry,updateEntry,eliminarArticulo,getArticuloBusqueda} = require('../controllers/apicontrollers')



router.get('/', getEntries)

 
router.get('/search/?',getArticuloBusqueda)


router.get('/:id',getArticulo)      


router.post('/',createEntry)           


router.put('/:id',updateEntry)


router.delete('/:id', eliminarArticulo) 




module.exports = router;