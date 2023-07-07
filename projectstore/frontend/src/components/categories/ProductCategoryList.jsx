import React, { useState, useEffect } from "react";
import api from "../../config/api";
import PermissionsProvider, {
  usePermissions,
} from "../../config/PermissionsContext";
import ConfirmationModal from "../ConfirmationModal";
import ProductCategoryForm from "./ProductCategoryForm";

const ProductCategoryList = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const allowedActions = usePermissions();
  const [isAllowed, setIsAllowed] = useState({
    create: allowedActions.includes("create"),
    edit: allowedActions.includes("edit"),
    delete: allowedActions.includes("delete"),
  });

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const response = await api.get("/product-categories");
      setProductCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedProductCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (productCategory) => {
    setSelectedProductCategory(productCategory);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedProductCategory(null);
    setIsFormOpen(false);
  };

  const openConfirmationModal = (productCategory) => {
    setSelectedProductCategory(productCategory);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedProductCategory(null);
    setIsConfirmationModalOpen(false);
  };

  const deleteProductCategory = async () => {
    try {
      await api.delete(`/product-categories/${selectedProductCategory._id}`);
      setIsConfirmationModalOpen(false);
      fetchProductCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductCategorySubmit = async () => {
    setIsFormOpen(false);
    fetchProductCategories();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product Category List</h1>

      <button
        onClick={openCreateForm}
        disabled={!isAllowed.create}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add Product Category
      </button>

      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productCategories.map((productCategory) => (
            <tr key={productCategory._id}>
              <td className="py-2">{productCategory.name}</td>
              <td className="py-2">{productCategory.slug}</td>
              <td className="py-2">
                <button
                  onClick={() => openEditForm(productCategory)}
                  className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                  disabled={!isAllowed.edit}
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(productCategory)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedProductCategory
                  ? "Edit Product Category"
                  : "Create Product Category"}
              </h2>
              <button
                onClick={closeForm}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <ProductCategoryForm
              productCategoryId={selectedProductCategory?._id}
              onClose={closeForm}
              onSubmit={handleProductCategorySubmit}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this product category?"
          onConfirm={deleteProductCategory}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

const allowedRoles = ["64a37341c4818f516bc4eb04", "64a2f13587ce9a8f529ff289"];
const componentName = "productCategoryController";

const ProductCategoryListWithPermissions = () => (
  <PermissionsProvider
    allowedRoles={allowedRoles}
    componentName={componentName}
  >
    <ProductCategoryList />
  </PermissionsProvider>
);

export default ProductCategoryListWithPermissions;
