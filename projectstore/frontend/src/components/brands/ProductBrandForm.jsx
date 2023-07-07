import React, { useState, useEffect } from "react";
import api from "../../config/api";

const ProductBrandForm = ({ productBrandId, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (productBrandId) {
      const fetchProductBrand = async () => {
        try {
          const response = await api.get(`/product-brands/${productBrandId}`);
          const { name, slug } = response.data;
          setName(name);
          setSlug(slug);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProductBrand();
    }
  }, [productBrandId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productBrandData = {
      name,
      slug,
    };

    try {
      if (productBrandId) {
        await api.put(`/product-brands/${productBrandId}`, productBrandData);
      } else {
        await api.post("/product-brands", productBrandData);
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 ml-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          {productBrandId ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProductBrandForm;
