import React from "react";

const ProductBrandForm = ({ brands, selectedBrands, onChange, isMultiple }) => {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    onChange(selectedOptions);
  };

  return (
    <select
      value={isMultiple ? selectedBrands : selectedBrands[0]}
      onChange={handleChange}
      multiple={isMultiple}
      className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
      required
    >
      <option value="">Seleccione</option>
      {brands.map((brand) => (
        <option key={brand._id} value={brand._id}>
          {brand.name}
        </option>
      ))}
    </select>
  );
};

export default ProductBrandForm;
