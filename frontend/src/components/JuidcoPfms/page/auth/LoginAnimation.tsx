import React from "react";
import Lottie from "react-lottie";
import animationGraph from "@/json/animationGraph.json"
import animationRupee from "@/json/animationRupee.json"

export const GraphAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationGraph,
    renderer: "svg",
  };
  return <Lottie options={defaultOptions} height={500} width={500} />;
};

export const RupeeAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationRupee,
      renderer: "svg",
    };
    return <Lottie options={defaultOptions} height={150} width={150} />;
  };
