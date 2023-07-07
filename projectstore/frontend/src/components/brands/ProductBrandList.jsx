import React, { useState, useEffect } from "react";
import api from "../../config/api";
import PermissionsProvider, {
  usePermissions,
} from "../../config/PermissionsContext";
import ConfirmationModal from "../ConfirmationModal";
import ProductBrandForm from "./ProductBrandForm";

const ProductBrandList = () => {
  const [productBrands, setProductBrands] = useState([]);
  const [selectedProductBrand, setSelectedProductBrand] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const allowedActions = usePermissions();
  const [isAllowed, setIsAllowed] = useState({
    create: allowedActions.includes("create"),
    edit: allowedActions.includes("edit"),
    delete: allowedActions.includes("delete"),
  });

  useEffect(() => {
    fetchProductBrands();
  }, []);

  const fetchProductBrands = async () => {
    try {
      const response = await api.get("/product-brands");
      setProductBrands(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedProductBrand(null);
    setIsFormOpen(true);
  };

  const openEditForm = (productBrand) => {
    setSelectedProductBrand(productBrand);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedProductBrand(null);
    setIsFormOpen(false);
  };

  const openConfirmationModal = (productBrand) => {
    setSelectedProductBrand(productBrand);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedProductBrand(null);
    setIsConfirmationModalOpen(false);
  };

  const deleteProductBrand = async () => {
    try {
      await api.delete(`/product-brands/${selectedProductBrand._id}`);
      setIsConfirmationModalOpen(false);
      fetchProductBrands();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductBrandSubmit = async () => {
    setIsFormOpen(false);
    fetchProductBrands();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product Brand List</h1>

      <button
        onClick={openCreateForm}
        disabled={!isAllowed.create}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add Product Brand
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
          {productBrands.map((productBrand) => (
            <tr key={productBrand._id}>
              <td className="py-2">{productBrand.name}</td>
              <td className="py-2">{productBrand.slug}</td>
              <td className="py-2">
                <button
                  onClick={() => openEditForm(productBrand)}
                  className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                  disabled={!isAllowed.edit}
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(productBrand)}
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
                {selectedProductBrand
                  ? "Edit Product Brand"
                  : "Create Product Brand"}
              </h2>
              <button
                onClick={closeForm}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <ProductBrandForm
              productBrandId={selectedProductBrand?._id}
              onClose={closeForm}
              onSubmit={fetchProductBrands}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this product brand?"
          onConfirm={deleteProductBrand}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

const allowedRoles = ["64a37341c4818f516bc4eb04", "64a2f13587ce9a8f529ff289"];
const componentName = "productBrandController";

const ProductBrandListWithPermissions = () => (
  <PermissionsProvider
    allowedRoles={allowedRoles}
    componentName={componentName}
  >
    <ProductBrandList />
  </PermissionsProvider>
);

export default ProductBrandListWithPermissions;
