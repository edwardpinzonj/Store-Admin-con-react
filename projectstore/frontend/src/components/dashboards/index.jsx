import React from "react";
import ProductBrandChart from "./ProductBrandChart";
import ProductTopChart from "./ProductTopChart";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="bg-white rounded-lg shadow-md p-4"
          style={{ minHeight: "305px" }}
        >
          <h2 className="text-lg font-semibold mb-2">Productos por Marca</h2>
          <div className="w-full h-48 md:h-auto">
            <ProductBrandChart />
          </div>
        </div>
        <div
          className="bg-white rounded-lg shadow-md p-4"
          style={{ minHeight: "300px" }}
        >
          <h2 className="text-lg font-semibold mb-2">Productos Top</h2>
          <div className="w-full h-48 md:h-auto">
            <ProductTopChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
