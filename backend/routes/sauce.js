
const express =require('express');
const router=express.Router()

const sauceCtrl=require('../controllers/sauce')

const auth=require('../middleware/auth')
const multer=require('../middleware/multer-config')

router.put('/:id',auth,multer,sauceCtrl.modifySauce)
router.delete('/:id',sauceCtrl.deleteSauce)

router.post('/',multer,sauceCtrl.createSauce)
router.get('/:id',auth, sauceCtrl.getOneSauce)
router.get('/' ,auth, sauceCtrl.getAllSauces)
router.post('/:id/like', auth, sauceCtrl.likeSauce);



module.exports = router;