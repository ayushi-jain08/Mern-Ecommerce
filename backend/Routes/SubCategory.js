const express = require('express')
const { CreateSubcategory, GetSingleSubcategory, GetSubCategory } = require('../Controller/SubCategory')
const router = express.Router()

router.post("/subcategories",CreateSubcategory )
router.get("/subcategories", GetSubCategory)
router.get("/subcategory/:subcategoryID", GetSingleSubcategory)

module.exports = router