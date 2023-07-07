import React, { useState, useEffect } from "react";
import api, { base } from "../../config/api";
import PermissionsProvider, {
  usePermissions,
} from "../../config/PermissionsContext";
import ConfirmationModal from "../ConfirmationModal";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const allowedActions = usePermissions();
  const [isAllowed, setIsAllowed] = useState({
    create: allowedActions.includes("create"),
    edit: allowedActions.includes("edit"),
    delete: allowedActions.includes("delete"),
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(false);
  };

  const openConfirmationModal = (product) => {
    setSelectedProduct(product);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedProduct(null);
    setIsConfirmationModalOpen(false);
  };

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${selectedProduct._id}`);
      setIsConfirmationModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSubmit = async () => {
    setIsFormOpen(false);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>

      <button
        onClick={openCreateForm}
        disabled={!isAllowed.create}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add Product
      </button>

      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Category</th>
            <th className="py-2">Price</th>
            <th className="py-2">Sale Price</th>
            <th className="py-2">Vendor</th>
            <th className="py-2">Review</th>
            <th className="py-2">Ratings</th>
            <th className="py-2">Until</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Top</th>
            <th className="py-2">Featured</th>
            <th className="py-2">Is New</th>
            <th className="py-2">Pictures</th>
            <th className="py-2">Sm Pictures</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.slug}</td>
              <td className="py-2">{product.category.name}</td>
              <td className="py-2">{product.price}</td>
              <td className="py-2">{product.salePrice}</td>
              <td className="py-2">{product.vendor}</td>
              <td className="py-2">{product.review}</td>
              <td className="py-2">{product.ratings}</td>
              <td className="py-2">{product.until}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2">
                <span className={product.top ? "text-red-600" : ""}>
                  {product.top ? "Si" : "No"}
                </span>
              </td>
              <td className="py-2">
                <span className={product.featured ? "text-red-600" : ""}>
                  {product.featured ? "Si" : "No"}
                </span>
              </td>
              <td className="py-2">
                <span className={product.isNewP ? "text-green-600" : ""}>
                  {product.isNewP ? "Si" : "No"}
                </span>
              </td>
              <td className="py-2">
                {product.pictures.map((picture) => (
                  <img
                    key={picture}
                    src={`${base}/uploads/${picture}`}
                    alt={picture}
                    className="w-20 h-20 object-cover"
                  />
                ))}
              </td>
              <td className="py-2">
                {product.smPictures.map((smPicture) => (
                  <img
                    key={smPicture}
                    src={`${base}/uploads/${smPicture}`}
                    alt={smPicture}
                    className="w-20 h-20 object-cover"
                  />
                ))}
              </td>
              <td className="py-2">
                <button
                  onClick={() => openEditForm(product)}
                  className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                  disabled={!isAllowed.edit}
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(product)}
                  className="px-2 py-1 ml-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-100"
                  disabled={!isAllowed.delete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900 overflow-auto">
          <div className="bg-white rounded-lg p-6 auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedProduct ? "Edit Product" : "Create Product"}
              </h2>
              <button
                onClick={closeForm}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <ProductForm
              productId={selectedProduct?._id}
              onClose={closeForm}
              onSubmit={handleProductSubmit}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={deleteProduct}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

const allowedRoles = ["64a37341c4818f516bc4eb04", "64a2f13587ce9a8f529ff289"];
const componentName = "productController";

const ProductListWithPermissions = () => (
  <PermissionsProvider
    allowedRoles={allowedRoles}
    componentName={componentName}
  >
    <ProductList />
  </PermissionsProvider>
);

export default ProductListWithPermissions;
