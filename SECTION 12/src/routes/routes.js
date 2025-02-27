const express = require("express")
const  apiUser = require("../api/user")

const router = express.Router()


router.get('/',apiUser.FindAll)
router.get('/:id',apiUser.FindById)
router.post('/',apiUser.Create)
router.put('/:id',apiUser.Update)
router.delete('/:id',apiUser.Delete)

module.exports = router;



