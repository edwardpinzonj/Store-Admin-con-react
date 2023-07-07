import React from "react";

const ProductCategoryForm = ({
  categories,
  selectedCategories,
  onChange,
  isMultiple,
}) => {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    onChange(selectedOptions);
  };

  return (
    <select
      value={selectedCategories}
      onChange={handleChange}
      multiple={isMultiple}
      required
      className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
    >
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default ProductCategoryForm;
