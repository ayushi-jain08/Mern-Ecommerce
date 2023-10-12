// =======================CREATE CATEGORY=================================
const Category = require("../Model/Category")

const CreateCategory = async(req,res) => {
try {
    const { name, subcategories } = req.body
    const category = new Category({name, subcategories})

    await category.save()
    res.status(200).json(category)
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
}
}
// =====================UPDATE CATEGORY===================
const Upadatecategory = async(req,res) => {
    const { categoryId } = req.params;
    try {
      const UpdatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        { new: true }
      );
      if (!UpdatedCategory) {
          return res.status(404).json({ error: 'category not found' });
        }
    res.status(200).json(UpdatedCategory)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error", error });
    }
}

// ======================GET CATEGORY===========================
const GetCategory = async(req,res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
      } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Server error", err });
      }
}

// ======================GET SUBCATEGORY=====================
const GetSubCategory = async(req,res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
}
module.exports = {CreateCategory, Upadatecategory, GetCategory, GetSubCategory}

