"use client";

import React, { lazy } from "react";
const Home  = lazy(()=> import("./Home"))

const HeroHomePage = () => {
  
  return (
    <div>
      <Home/>
    </div>
  );
};

export default HeroHomePage;
