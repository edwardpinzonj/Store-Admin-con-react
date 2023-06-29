const ProductCategory = require("../models/ProductCategory");

const createProductCategory = async (req, res) => {
  try {
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría de producto" });
  }
};

const getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find();
    res.status(200).json(productCategories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las categorías de producto" });
  }
};

const getProductCategoryById = async (req, res) => {
  try {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategory.findById(productCategoryId);
    if (!productCategory) {
      return res
        .status(404)
        .json({ error: "Categoría de producto no encontrada" });
    }
    res.status(200).json(productCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener la categoría de producto" });
  }
};

const updateProductCategory = async (req, res) => {
  try {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategory.findByIdAndUpdate(
      productCategoryId,
      req.body,
      { new: true }
    );
    if (!productCategory) {
      return res
        .status(404)
        .json({ error: "Categoría de producto no encontrada" });
    }
    res.status(200).json(productCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar la categoría de producto" });
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategory.findByIdAndRemove(
      productCategoryId
    );
    if (!productCategory) {
      return res
        .status(404)
        .json({ error: "Categoría de producto no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Categoría de producto eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar la categoría de producto" });
  }
};

module.exports = {
  createProductCategory,
  getProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};
