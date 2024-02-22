const express = require('express')
const router = express.Router()
const poolsController = require('../controllers/poolsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(poolsController.getAllPools)
    .post(poolsController.createNewPool)
    .patch(poolsController.updatePool)
    .delete(poolsController.deletePool)


module.exports = router