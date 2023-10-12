const express = require('express')
const { CreateCategory, Upadatecategory, GetCategory, GetSubCategory } = require('../Controller/Category')
const router = express.Router()


router.post("/categories",CreateCategory )
router.patch("/categories/:categoryId", Upadatecategory)
router.get("/categories", GetCategory )
router.get("/categories/:categoryId", GetSubCategory )
module.exports = router