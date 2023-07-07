const ProductBrand = require("../models/ProductBrand");

const createProductBrand = async (req, res) => {
  try {
    const productBrand = new ProductBrand(req.body);
    await productBrand.save();
    res.status(201).json(productBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la marca de producto" });
  }
};

const getCountProductByBrands = async (req, res) => {
  try {
    const countProductsByBrand = await ProductBrand.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "brands",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          Cantidad: { $size: "$products" },
        },
      },
    ]);

    res.status(200).json(countProductsByBrand);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al obtener la cantidad de marcas por productos" });
  }
};

const getProductBrands = async (req, res) => {
  try {
    const productBrands = await ProductBrand.find();
    res.status(200).json(productBrands);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las marcas de producto" });
  }
};

const getProductBrandById = async (req, res) => {
  try {
    const { productBrandId } = req.params;
    const productBrand = await ProductBrand.findById(productBrandId);
    if (!productBrand) {
      return res.status(404).json({ error: "Marca de producto no encontrada" });
    }
    res.status(200).json(productBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la marca de producto" });
  }
};

const updateProductBrand = async (req, res) => {
  try {
    const { productBrandId } = req.params;
    const productBrand = await ProductBrand.findByIdAndUpdate(
      productBrandId,
      req.body,
      { new: true }
    );
    if (!productBrand) {
      return res.status(404).json({ error: "Marca de producto no encontrada" });
    }
    res.status(200).json(productBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la marca de producto" });
  }
};

const deleteProductBrand = async (req, res) => {
  try {
    const { productBrandId } = req.params;
    const productBrand = await ProductBrand.findByIdAndRemove(productBrandId);
    if (!productBrand) {
      return res.status(404).json({ error: "Marca de producto no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Marca de producto eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la marca de producto" });
  }
};

module.exports = {
  createProductBrand,
  getCountProductByBrands,
  getProductBrands,
  getProductBrandById,
  updateProductBrand,
  deleteProductBrand,
};
