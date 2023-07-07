const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      slug,
      category,
      shortDesc,
      price,
      salePrice,
      vendor,
      brands,
      review,
      ratings,
      until,
      stock,
      top,
      featured,
      isNew,
      variants,
    } = req.body;

    const pictures = req.files["pictures"]
      ? req.files["pictures"].map((file) => file.filename)
      : [];
    const smPictures = req.files["smPictures"]
      ? req.files["smPictures"].map((file) => file.filename)
      : [];

    // Crear un nuevo producto con los datos
    const product = new Product({
      sku,
      name,
      slug,
      category: JSON.parse(category),
      pictures,
      smPictures,
      shortDesc,
      price,
      salePrice,
      vendor,
      brands: JSON.parse(brands),
      review,
      ratings,
      until,
      stock,
      top,
      featured,
      isNewP: isNew,
      variants,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({ top: true }, { name: 1, stock: 1 });
    const productData = products.map((product) => ({
      name: product.name,
      stock: product.stock,
    }));
    res.status(200).json(productData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos top" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const oldProduct = await Product.findById(productId);
    const {
      sku,
      name,
      slug,
      category,
      shortDesc,
      price,
      salePrice,
      vendor,
      brands,
      review,
      ratings,
      until,
      stock,
      top,
      featured,
      isNew,
      variants,
    } = req.body;

    const pictures = req.files["pictures"]
      ? req.files["pictures"].map((file) => file.filename)
      : [];
    const smPictures = req.files["smPictures"]
      ? req.files["smPictures"].map((file) => file.filename)
      : [];

    // Crear un nuevo producto con los datos
    const newProduct = {
      sku,
      name,
      slug,
      category: JSON.parse(category),
      pictures: pictures.length ? pictures : oldProduct.pictures,
      smPictures: smPictures.length ? smPictures : oldProduct.smPictures,
      shortDesc,
      price,
      salePrice,
      vendor,
      brands: JSON.parse(brands),
      review,
      ratings,
      until,
      stock,
      top,
      featured,
      isNewP: isNew,
      variants,
    };

    const product = await Product.findByIdAndUpdate(productId, newProduct, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getTopProducts,
};
