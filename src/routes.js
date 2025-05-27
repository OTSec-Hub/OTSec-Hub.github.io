import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import IntroductionPage from "./pages/IntroductionPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="introduction" element={<IntroductionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
