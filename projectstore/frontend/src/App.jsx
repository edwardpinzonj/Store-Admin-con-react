import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Layout>
          <RoutesComponent />
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
