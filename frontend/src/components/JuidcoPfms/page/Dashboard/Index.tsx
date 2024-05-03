"use client";

import React, { lazy } from "react";
const Dashboard = lazy(() => import("./Dashboard"));

const HeroDashboardPage = () => {
  return <Dashboard />;
};

export default HeroDashboardPage;
