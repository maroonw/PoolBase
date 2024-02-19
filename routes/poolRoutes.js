const express = require('express')
const router = express.Router()
const poolsController = require('../controllers/poolsController')

router.route('/')
    .get(poolsController.getAllPools)
    .post(poolsController.createNewPool)
    .patch(poolsController.updatePool)
    .delete(poolsController.deletePool)


module.exports = router