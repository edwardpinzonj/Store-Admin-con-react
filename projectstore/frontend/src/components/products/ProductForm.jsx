import React, { useState, useEffect } from "react";
import api from "../../config/api";
// eslint-disable-next-line no-undef
import { formatDate } from "../../utils/functions";
import ProductBrandForm from "./ProductBrandForm";
import ProductCategoryForm from "./ProductCategoryForm";

const ProductForm = ({ productId, onClose, onSubmit }) => {
  // Estado para el manejo de los datos del formulario
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [selectedSmPictures, setSelectedSmPictures] = useState([]);
  const [shortDesc, setShortDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [vendor, setVendor] = useState("");
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const currentDate = new Date();
  const [until, setUntil] = useState(formatDate(currentDate));
  const [stock, setStock] = useState(0);
  const [top, setTop] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Cargar las categorías y marcas al montar el componente
  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoriesResponse = await api.get("/product-categories");
        const brandsResponse = await api.get("/product-brands");
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesAndBrands();
  }, []);
  setSku;
  // Cargar los datos del producto cuando se pasa un ID de producto
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${productId}`);
          const product = response.data;
          setSku(product.sku);
          setName(product.name);
          setSlug(product.slug);
          setCategory(product.category);
          setShortDesc(product.shortDesc);
          setPrice(product.price);
          setSalePrice(product.salePrice);
          setVendor(product.vendor);
          setSelectedBrands([product.brands]);
          setReview(product.review);
          setRatings(product.ratings);
          const formattedUntil = formatDate(new Date(product.until));
          setUntil(formattedUntil);
          setStock(product.stock);
          setTop(product.top);
          setFeatured(product.featured);
          setIsNew(product.isNewP);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  // Manejar la subida de imágenes
  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedPictures = files.filter((file) =>
      file.type.startsWith("image/")
    );

    setSelectedPictures(selectedPictures);
  };

  const handleSmPictureUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedSmPictures = files.filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedSmPictures(selectedSmPictures);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData paraenviar los archivos junto con los datos del formulario
    const formData = new FormData();

    // Agregar los datos del formulario al objeto FormData
    formData.append("sku", sku);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("category", JSON.stringify(category));
    formData.append("shortDesc", shortDesc);
    formData.append("price", price);
    formData.append("salePrice", salePrice);
    formData.append("vendor", vendor);
    formData.append("brands", JSON.stringify(selectedBrands));
    formData.append("review", review);
    formData.append("ratings", ratings);
    formData.append("until", until);
    formData.append("stock", stock);
    formData.append("top", top);
    formData.append("featured", featured);
    formData.append("isNew", isNew);

    // Agregar las imágenes al objeto FormData
    selectedPictures.forEach((file, index) => {
      formData.append("pictures", file);
    });

    selectedSmPictures.forEach((file, index) => {
      formData.append("smPictures", file);
    });

    // Realizar la petición al backend para guardar el producto
    try {
      if (productId) {
        await api.put(`/products/${productId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      // Ejecutar la función de callback para notificar que se ha guardado el producto
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el evento de cancelar
  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
      <div className="mb-4">
        <label
          htmlFor="sku"
          className="block text-sm font-medium text-gray-700"
        >
          SKU
        </label>
        <input
          type="text"
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="shortDesc"
          className="block text-sm font-medium text-gray-700"
        >
          Short Description
        </label>
        <textarea
          id="shortDesc"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="salePrice"
          className="block text-sm font-medium text-gray-700"
        >
          Sale Price
        </label>
        <input
          type="number"
          id="salePrice"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="vendor"
          className="block text-sm font-medium text-gray-700"
        >
          Vendor
        </label>
        <input
          type="text"
          id="vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="brands"
          className="block text-sm font-medium text-gray-700"
        >
          Brands
        </label>
        <ProductBrandForm
          brands={brands}
          selectedBrands={selectedBrands}
          onChange={(selectedBrands) => setSelectedBrands(selectedBrands)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700"
        >
          Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="ratings"
          className="block text-sm font-medium text-gray-700"
        >
          Ratings
        </label>
        <input
          type="number"
          id="ratings"
          value={ratings}
          onChange={(e) => setRatings(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="until"
          className="block text-sm font-medium text-gray-700"
        >
          Until
        </label>
        <input
          type="date"
          id="until"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="top"
          className="block text-sm font-medium text-gray-700"
        >
          Top
        </label>
        <input
          type="checkbox"
          id="top"
          checked={top}
          onChange={(e) => setTop(e.target.checked)}
          className="w-4 h-4 mt-2 text-sm border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="featured"
          className="block text-sm font-medium text-gray-700"
        >
          Featured
        </label>
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="w-4 h-4 mt-2 text-sm border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="isNew"
          className="block text-sm font-medium text-gray-700"
        >
          New
        </label>
        <input
          type="checkbox"
          id="isNew"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
          className="w-4 h-4 mt-2 text-sm border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="pictures"
          className="block text-sm font-medium text-gray-700"
        >
          Pictures
        </label>
        <input
          type="file"
          id="pictures"
          onChange={handlePictureUpload}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          multiple
          accept="image/*"
        />
      </div>
      {/* Resto de los campos del formulario */}
      <div className="mb-4">
        <label
          htmlFor="smPictures"
          className="block text-sm font-medium text-gray-700"
        >
          SmPictures
        </label>
        <input
          type="file"
          id="smPictures"
          onChange={handleSmPictureUpload}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          multiple
          accept="image/*"
        />
      </div>
      {/* Columna adicional para categorías */}
      <div className="mb-4">
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700"
        >
          Categories
        </label>
        <ProductCategoryForm
          categories={categories}
          selectedCategories={category}
          onChange={(selectedCategories) => setCategory(selectedCategories)}
          isMultiple={true}
        />
      </div>
      <div className="col-span-3">
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
