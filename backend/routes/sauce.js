
const express =require('express');
const router=express.Router()

const sauceCtrl=require('../controllers/sauce')

const auth=require('../middleware/auth')

const multer=require('../middleware/multer-config')

const comparaison = require('../middleware/comparaison')

router.put('/:id',auth,comparaison,multer,sauceCtrl.modifySauce)
router.delete('/:id',auth,comparaison,sauceCtrl.deleteSauce)

router.post('/',auth,multer,sauceCtrl.createSauce)
router.get('/:id',auth, sauceCtrl.getOneSauce)
router.get('/' ,auth, sauceCtrl.getAllSauces)
router.post('/:id/like',auth, sauceCtrl.likeSauce);



module.exports = router;