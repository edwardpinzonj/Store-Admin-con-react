import React, { useEffect, useState } from "react";
import api from "../../config/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductBrandChart = () => {
  const [chartData, setChartData] = useState([]);

  const fetchChartData = async () => {
    try {
      const response = await api.get("/product-brands/count-products");
      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cantidad" fill="rgba(75,192,192,0.6)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductBrandChart;
